import { database } from "../database/database";
import { AdjustOrderItem } from "../entities/Order";

export interface CreateAdjustOrderData {
  cost: number;
  dueDate: Date;
  createdAt: Date;
  customerId: number;
  orderItems: AdjustOrderItem[];
}

export interface AdjustOrderRawData {
  order_cost: number;
  order_due_date: string;
  order_created_at: string;
  order_delivered_at: string;
  order_item_id: number;
  order_item_title: string;
  order_item_description: string;
  ordered_service_id: number;
  ordered_service_cost: number;
  adjust_service_id: number;
  adjust_service_description: string;
  customer_name: string;
  customer_phone: string;
}

interface AdjustOrderData {
  /**
   * @function createAdjustOrder
   * @param orderData
   * @returns created order id
   */
  createAdjustOrder: (orderData: CreateAdjustOrderData) => Promise<number>;
  /**
   * @function getAdjustOrderById
   * @param id order id
   * @returns adjust order
   */
  getAdjustOrderById: (id: number) => Promise<AdjustOrderRawData[]>;
}

export function useAdjustOrderModel(): AdjustOrderData {
  function createAdjustOrder(
    orderData: CreateAdjustOrderData
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            "INSERT INTO orders (cost, due_date, type, created_at, id_customer) VALUES (?, ?, ?, ?, ?);",
            [
              orderData.cost,
              orderData.dueDate.toISOString(),
              "Adjust",
              orderData.createdAt.toISOString(),
              orderData.customerId,
            ],
            (transaction, resultSet) => {
              const createdOrderId = resultSet.insertId;

              if (!createdOrderId) {
                return reject("Não foi possível cadastrar o pedido!");
              }

              orderData.orderItems.forEach((orderItem) => {
                transaction.executeSql(
                  "INSERT INTO order_items (title, description, id_order) VALUES (?, ?, ?);",
                  [
                    orderItem.title,
                    orderItem.description || "",
                    createdOrderId,
                  ],
                  (transaction, resultSet) => {
                    const createdOrderItemId = resultSet.insertId;

                    if (!createdOrderItemId) {
                      return reject(
                        "Não foi possível cadastrar os itens do pedido!"
                      );
                    }

                    const adjustsSQLValues = orderItem.adjusts
                      .map(
                        (adjust) =>
                          `(${adjust.id}, ${createdOrderItemId}, ${adjust.cost})`
                      )
                      .join(",");

                    transaction.executeSql(
                      `INSERT INTO ordered_services (id_adjust_service, id_order_item, cost) VALUES ${adjustsSQLValues}`,
                      undefined,
                      (_, resultSet) => {
                        const wasAdjustsCreatedSuccessfully =
                          resultSet.insertId;

                        if (!wasAdjustsCreatedSuccessfully) {
                          return reject(
                            `Não foi possível cadastrar os ajustes do item ${orderItem.title}`
                          );
                        }

                        return resolve(createdOrderId);
                      }
                    );
                  }
                );
              });
            }
          );
        },
        (error) => {
          console.log(error);
          reject(null);
        },
        () => {
          console.log("[Model] Adjust order created successfully!");
        }
      );
    });
  }

  function getAdjustOrderById(id: number): Promise<AdjustOrderRawData[]> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            `
            SELECT
              (ord.cost) order_cost,
              (ord.due_date) order_due_date,
              (ord.created_at) order_created_at,
              (ord.delivered_at) order_delivered_at,
              (ord_it.id) order_item_id,
              (ord_it.title) order_item_title,
              (ord_it.description) order_item_description,
              (ord_se.id) ordered_service_id,
              (ord_se.cost) ordered_service_cost,
              (adj_se.id) adjust_service_id,
              (adj_se.description) adjust_service_description,
              (cst.name) customer_name,
              (cst.phone) customer_phone
            FROM orders ord
            JOIN customers cst ON ord.id_customer = cst.id
            JOIN order_items ord_it ON ord.id = ord_it.id_order
            JOIN ordered_services ord_se ON ord_it.id = ord_se.id_order_item
            JOIN adjust_services adj_se ON ord_se.id_adjust_service = adj_se.id
            WHERE ord.id = ?
            ORDER BY  ord_it.id ASC;
          `,
            [id],
            (_, resultSet) => {
              resolve(resultSet.rows._array);
            }
          );
        },
        (error) => {
          console.log(error);
          reject(null);
        },
        () => {
          console.log("[Model] Adjust order fetched successfully!");
        }
      );
    });
  }

  return {
    createAdjustOrder,
    getAdjustOrderById,
  };
}
