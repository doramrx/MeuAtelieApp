import { database } from "../database/database";
import { CustomerMeasure } from "../entities/Order";

export interface TailoredClothOrderRawData {
  order_cost: number;
  order_due_date: string;
  order_created_at: string;
  order_delivered_at: string;
  customer_id: number;
  customer_name: string;
  customer_phone: string;
  order_item_id: number;
  order_item_title: string;
  order_item_description: string;
  customer_measure_id: number;
  customer_measure_name: string;
  customer_measure_value: number;
  order_customer_measure_id: number;
}

export interface CreateTailoredOrderData {
  cost: number;
  dueDate: Date;
  createdAt: Date;
  customerId: number;
  clothTitle: string;
  clothDescription: string;
  customerMeasures: CustomerMeasure[];
}

interface TailoredClothOrderModelData {
  /**
   * @function getTailoredClothOrderById
   * @param id order id
   * @returns raw tailored cloth order list
   */
  getTailoredClothOrderById: (
    id: number
  ) => Promise<TailoredClothOrderRawData[]>;
  /**
   * @function createTailoredClothOrder
   * @param data tailored cloth order data
   * @returs created tailored cloth order
   */
  createTailoredClothOrder: (
    orderData: CreateTailoredOrderData
  ) => Promise<number>;
}

export function useTailoredClothOrderModel(): TailoredClothOrderModelData {
  function getTailoredClothOrderById(
    id: number
  ): Promise<TailoredClothOrderRawData[]> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            `SELECT 
          (ord.cost) order_cost,
          (ord.due_date) order_due_date,
          (ord.created_at) order_created_at,
          (ord.delivered_at) order_delivered_at,
          (csm.id) customer_id,
          (csm.name) customer_name,
          (csm.phone) customer_phone,
          (ord_it.id) order_item_id,
          (ord_it.title) order_item_title,
          (ord_it.description) order_item_description,
          (csm_mea.id) customer_measure_id,
          (csm_mea.measure) customer_measure_name,
          (ord_csm_mea.value) customer_measure_value,
          (ord_csm_mea.id) order_customer_measure_id
        FROM orders ord
        JOIN order_items ord_it
          ON ord.id = ord_it.id_order
        JOIN customers as csm
          ON ord.id_customer = csm.id
        LEFT OUTER JOIN order_customer_measures ord_csm_mea
          ON ord_csm_mea.id_order_item = ord_it.id
        LEFT OUTER JOIN customer_measures csm_mea
          ON csm_mea.id = ord_csm_mea.id_customer_measure
        WHERE ord.id = ?;`,
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
          console.log("[Model] Tailored Cloth Order fetched successfully!");
        }
      );
    });
  }

  function createTailoredClothOrder(
    orderData: CreateTailoredOrderData
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            "INSERT INTO orders (cost, due_date, type, created_at, id_customer) VALUES (?, ?, ?, ?, ?);",
            [
              orderData.cost,
              orderData.dueDate.toISOString(),
              "Tailored",
              orderData.createdAt.toISOString(),
              orderData.customerId,
            ],
            (transaction, resultSet) => {
              const createdOrderId = resultSet.insertId;

              if (!createdOrderId) {
                return reject("Não foi possível cadastrar o pedido!");
              }

              transaction.executeSql(
                "INSERT INTO order_items (title, description, id_order) VALUES (?, ?, ?);",
                [
                  orderData.clothTitle,
                  orderData.clothDescription,
                  createdOrderId,
                ],
                (transaction, resultSet) => {
                  const createdOrderItemId = resultSet.insertId;

                  if (!createdOrderItemId) {
                    return reject("Não foi possível cadastrar a peça!");
                  }

                  if (orderData.customerMeasures.length === 0) {
                    return resolve(createdOrderId);
                  }

                  const customerMeasuresSQL = orderData.customerMeasures
                    .map(
                      (_customerMeasure) =>
                        `(${_customerMeasure.measure.id}, ${createdOrderItemId}, ${_customerMeasure.value})`
                    )
                    .join(",");

                  transaction.executeSql(
                    `
                  INSERT INTO order_customer_measures (id_customer_measure, id_order_item, value) VALUES ${customerMeasuresSQL};`,
                    undefined,
                    (_, resultSet) => {
                      const createdCustomerMeasureId = resultSet.insertId;

                      if (!createdCustomerMeasureId) {
                        return reject(
                          "Não foi possível cadastras as medidas do cliente!"
                        );
                      }

                      return resolve(createdOrderId);
                    }
                  );
                }
              );
            }
          );
        },
        (error) => {
          console.log(error);
          reject(null);
        },
        () => {
          console.log("[Model] Tailored Cloth order created successfully!");
        }
      );
    });
  }

  return {
    createTailoredClothOrder,
    getTailoredClothOrderById,
  };
}
