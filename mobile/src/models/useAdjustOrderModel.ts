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

export interface UpdateAdjustOrderData {
  orderId: number;
  dueDate: Date;
  items: AdjustOrderItem[];
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
  /**
   * @function updateAdjustOrder
   * @param orderData adjust order data
   * @returns void
   */
  updateAdjustOrder: (orderData: UpdateAdjustOrderData) => Promise<void>;
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

  function updateAdjustOrder(orderData: UpdateAdjustOrderData): Promise<void> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          const orderTotalCost = orderData.items.reduce((accumulator, item) => {
            return (
              accumulator +
              item.adjusts.reduce((subtotal, adjust) => {
                return subtotal + adjust.cost;
              }, 0)
            );
          }, 0);

          transaction.executeSql(
            "UPDATE orders SET cost = ?, due_date = ? WHERE id = ?;",
            [
              orderTotalCost,
              orderData.dueDate.toISOString(),
              orderData.orderId,
            ],
            (transaction, resultSet) => {
              if (resultSet.rowsAffected !== 1) {
                reject(
                  "Não foi possível atualizar o pedido de ajuste de roupa"
                );
              }

              orderData.items.forEach((item) => {
                transaction.executeSql(
                  "UPDATE order_items SET title = ?, description = ? WHERE id = ?;",
                  [item.title, item.description || "", item.id],
                  (transaction, resultSet) => {
                    if (resultSet.rowsAffected !== 1) {
                      reject("Não foi possível atualizar os itens de ajuste");
                    }

                    const registeredAdjustsNotRemoved = item.adjusts.filter(
                      (adjust) => adjust.orderedAdjustId !== undefined
                    );

                    if (registeredAdjustsNotRemoved.length > 0) {
                      const deleteAdjustsSQL = registeredAdjustsNotRemoved
                        .map((adjust) => adjust.orderedAdjustId)
                        .join(",");

                      transaction.executeSql(
                        `DELETE FROM ordered_services WHERE id NOT IN (${deleteAdjustsSQL}) AND id_order_item = ?;`,
                        [item.id],
                        (_, resultSet) => {
                          if (resultSet.rowsAffected === 0) {
                            console.log("Não foi possível deletar os ajustes");
                          } else {
                            console.log("Ajustes deletados com sucesso");
                          }
                        }
                      );
                    } else {
                      transaction.executeSql(
                        "DELETE FROM ordered_services WHERE id_order_item = ?;",
                        [item.id],
                        (_, resultSet) => {
                          if (resultSet.rowsAffected === 0) {
                            console.log("Não foi possível deletar os ajustes");
                          } else {
                            console.log("Todos os ajustes foram deletados");
                          }
                        }
                      );
                    }

                    const adjustsToCreate = item.adjusts.filter(
                      (adjust) => adjust.orderedAdjustId === undefined
                    );

                    if (adjustsToCreate.length > 0) {
                      const adjustsToCreateValuesSQL = adjustsToCreate.map(
                        (adjust) => {
                          return `(${adjust.id}, ${item.id}, ${adjust.cost})`;
                        }
                      );

                      transaction.executeSql(
                        `INSERT INTO ordered_services(id_adjust_service, id_order_item, cost) VALUES ${adjustsToCreateValuesSQL};`,
                        undefined,
                        (_, resultSet) => {
                          if (resultSet.insertId && resultSet.insertId === 0) {
                            console.log(
                              "Não foi possível cadastrar novos registros de ajuste de roupa!"
                            );
                          } else {
                            console.log("Ajustes inseridos com sucesso");
                          }
                        }
                      );
                    }
                    resolve();
                  }
                );
              });
            }
          );
        },
        (error) => {
          console.log(error);
          reject();
        },
        () => {
          console.log("[Model] Adjust order updated successfully!");
        }
      );
    });
  }

  return {
    createAdjustOrder,
    getAdjustOrderById,
    updateAdjustOrder,
  };
}
