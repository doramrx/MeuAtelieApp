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

export interface UpdateTailoredOrderData {
  orderId: number;
  orderItemId: number;
  title: string;
  description: string | null;
  cost: number;
  dueDate: Date;
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
  /**
   * @function updateTailoredClothOrder
   * @param data tailored order data
   * @returns void
   */
  updateTailoredClothOrder: (
    orderData: UpdateTailoredOrderData
  ) => Promise<void>;
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

  function updateTailoredClothOrder(
    orderData: UpdateTailoredOrderData
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            "UPDATE orders SET cost = ?, due_date = ? WHERE id = ?;",
            [
              orderData.cost,
              orderData.dueDate.toISOString(),
              orderData.orderId,
            ],
            (transaction, resultSet) => {
              if (resultSet.rowsAffected !== 1) {
                return reject("Não foi possível atualizar o pedido");
              }

              transaction.executeSql(
                "UPDATE order_items SET title = ?, description = ? WHERE id = ?;",
                [
                  orderData.title,
                  orderData.description || "",
                  orderData.orderItemId,
                ],
                (transaction, resultSet) => {
                  if (resultSet.rowsAffected !== 1) {
                    return reject(
                      "Não foi possível atualizar o item do pedido"
                    );
                  }

                  const measuresToNotDelete = orderData.customerMeasures
                    .filter(
                      (measure) =>
                        measure.orderItemId !== null &&
                        measure.orderItemId !== undefined
                    )
                    .map((measure) => measure.orderItemId);

                  if (measuresToNotDelete.length > 0) {
                    transaction.executeSql(
                      ` DELETE FROM order_customer_measures
                    WHERE id NOT IN (${measuresToNotDelete.join(",")});`,
                      [],
                      (_, resultSet) => {
                        if (resultSet.rowsAffected > 0) {
                          console.log("Registros deletados com sucesso!");
                        } else {
                          console.log("Nenhuma medida foi deletada!");
                        }
                      }
                    );
                  }
                  // Itens que serão atualizados possuem um id e um valor
                  const measuresToUpdate = orderData.customerMeasures
                    .filter(
                      (measure) =>
                        measure.orderItemId !== null &&
                        measure.orderItemId !== undefined
                    )
                    .map((measure) => {
                      return {
                        value: Number(measure.value),
                        orderMeasureId: measure.orderItemId,
                      };
                    });

                  if (measuresToUpdate.length > 0) {
                    measuresToUpdate.forEach((measure) => {
                      transaction.executeSql(
                        "UPDATE order_customer_measures SET value = ? WHERE id = ?;",
                        [measure.value, measure.orderMeasureId as number],
                        (_, resultSet) => {
                          console.log(resultSet.rowsAffected);
                          if (resultSet.rowsAffected === 1) {
                            console.log("Medida(s) atualizada(s)!");
                          } else {
                            console.log("Nenhuma medida foi atualizada!");
                          }
                        }
                      );
                    });
                  }

                  const measuresToCreate = orderData.customerMeasures.filter(
                    (measure) =>
                      measure.orderItemId === null ||
                      measure.orderItemId === undefined
                  );

                  console.log(measuresToCreate);

                  // console.log(measuresToCreate);
                  if (measuresToCreate.length > 0) {
                    const measurementSQLValues = measuresToCreate.map(
                      (measure) => {
                        return `(${measure.measure.id}, ${
                          orderData.orderItemId
                        }, ${Number(measure.value)})`;
                      }
                    );
                    // console.log(measurementSQLValues);
                    transaction.executeSql(
                      `INSERT INTO order_customer_measures (id_customer_measure, id_order_item, value)
                  VALUES ${measurementSQLValues.join(",")};`,
                      undefined,
                      (_, resultSet) => {
                        if (resultSet.insertId && resultSet.insertId > 0) {
                          console.log("Registros inseridos com sucesso!");
                        } else {
                          console.log("Nenhuma medida foi inserida!");
                        }
                      }
                    );
                  }
                  resolve();
                }
              );
            }
          );
        },
        (error) => {
          console.log(error);
          reject();
        },
        () => {
          console.log("[Model] Tailored Cloth Order updated successfully");
        }
      );
    });
  }

  return {
    createTailoredClothOrder,
    getTailoredClothOrderById,
    updateTailoredClothOrder,
  };
}
