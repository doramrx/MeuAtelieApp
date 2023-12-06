import { database } from "../database/database";
import { CustomerMeasure, ModelPhotoView } from "../entities/Order";

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
  order_model_photo_id: number;
  order_model_photo_filename: string;
}

export interface CreateTailoredOrderData {
  cost: number;
  dueDate: Date;
  createdAt: Date;
  customerId: number;
  clothTitle: string;
  clothDescription: string;
  customerMeasures: CustomerMeasure[];
  modelPhotoFileName: string[];
}

export interface CreateTailoredOrderDataResult {
  orderId: number;
  orderItemId: number;
}

export interface UpdateTailoredOrderData {
  orderId: number;
  orderItemId: number;
  title: string;
  description: string | null;
  cost: number;
  dueDate: Date;
  customerMeasures: CustomerMeasure[];
  modelPhotos: ModelPhotoView[];
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
  ) => Promise<CreateTailoredOrderDataResult>;
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
          (ord_csm_mea.id) order_customer_measure_id,
          (clo_pho.id) order_model_photo_id,
          (clo_pho.photo_iri) order_model_photo_filename
        FROM orders ord
        JOIN order_items ord_it
          ON ord.id = ord_it.id_order
        JOIN customers as csm
          ON ord.id_customer = csm.id
        LEFT OUTER JOIN order_customer_measures ord_csm_mea
          ON ord_csm_mea.id_order_item = ord_it.id
        LEFT OUTER JOIN customer_measures csm_mea
          ON csm_mea.id = ord_csm_mea.id_customer_measure
        LEFT OUTER JOIN clothing_photos clo_pho
          ON clo_pho.id_order_item = ord_it.id
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
  ): Promise<CreateTailoredOrderDataResult> {
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
                    return resolve({
                      orderId: createdOrderId,
                      orderItemId: createdOrderItemId,
                    });
                  }

                  const customerMeasuresSQL = orderData.customerMeasures
                    .map(
                      (_customerMeasure) =>
                        `(${_customerMeasure.measure.id}, ${createdOrderItemId}, ${_customerMeasure.value})`
                    )
                    .join(",");

                  transaction.executeSql(
                    `INSERT INTO order_customer_measures (id_customer_measure, id_order_item, value) VALUES ${customerMeasuresSQL};`,
                    undefined,
                    (transaction, resultSet) => {
                      const createdCustomerMeasureId = resultSet.insertId;

                      if (!createdCustomerMeasureId) {
                        return reject(
                          "Não foi possível cadastrar as medidas do cliente!"
                        );
                      }

                      if (orderData.modelPhotoFileName.length === 0) {
                        return resolve({
                          orderId: createdOrderId,
                          orderItemId: createdOrderItemId,
                        });
                      }

                      const clothingPhotosSQLValues =
                        orderData.modelPhotoFileName
                          .map(
                            (modelPhotoFileName) =>
                              `('${modelPhotoFileName}', ${createdOrderItemId})`
                          )
                          .join(",");

                      transaction.executeSql(
                        `INSERT INTO clothing_photos (photo_iri, id_order_item) VALUES ${clothingPhotosSQLValues};`,
                        undefined,
                        (_, resultSet) => {
                          if (resultSet.insertId && resultSet.insertId != 0) {
                            return resolve({
                              orderId: createdOrderId,
                              orderItemId: createdOrderItemId,
                            });
                          }

                          return reject(
                            "Não foi possível cadastrar as fotos de modelo da roupa sob medida"
                          );
                        }
                      );
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

                  const modelPhotosToNotDelete = orderData.modelPhotos.filter(
                    (modelPhoto) => modelPhoto.id !== undefined
                  );

                  if (modelPhotosToNotDelete.length === 3) {
                    return resolve();
                  }

                  console.log(modelPhotosToNotDelete);

                  if (modelPhotosToNotDelete.length > 0) {
                    const modelPhotoIds = modelPhotosToNotDelete
                      .map((modelPhoto) => modelPhoto.id as number)
                      .join(",");

                    transaction.executeSql(
                      `DELETE FROM clothing_photos WHERE id NOT IN (${modelPhotoIds});`,
                      undefined,
                      (_, resultSet) => {
                        if (resultSet.rowsAffected === 0) {
                          console.log("Erro ao deletar fotos existentes");
                          return reject();
                        }

                        console.log("Fotos deletadas com sucesso");
                        return resolve();
                      }
                    );
                  } else {
                    transaction.executeSql(
                      "DELETE FROM clothing_photos WHERE id_order_item = ?;",
                      [orderData.orderItemId],
                      (_, resultSet) => {
                        if (resultSet.rowsAffected === 0) {
                          console.log(
                            "Erro ao deletar todas as fotos do pedido"
                          );
                          return reject();
                        }

                        console.log("Todas as fotos do pedido foram removidas");
                        return resolve();
                      }
                    );
                  }

                  const modelPhotosToCreate = orderData.modelPhotos.filter(
                    (modelPhoto) => modelPhoto.id === undefined
                  );

                  console.log(modelPhotosToCreate);

                  if (modelPhotosToCreate.length > 0) {
                    const modelPhotosSQLValues = modelPhotosToCreate
                      .map(
                        (orderPhoto) =>
                          `(${orderData.orderItemId},"${orderPhoto.uri}")`
                      )
                      .join(",");

                    transaction.executeSql(
                      `INSERT INTO clothing_photos (id_order_item, photo_iri) VALUES ${modelPhotosSQLValues};`,
                      undefined,
                      (_, resultSet) => {
                        if (resultSet.insertId && resultSet.insertId === 0) {
                          console.log(
                            "Não foi possível cadastrar as novas fotos"
                          );
                          return reject();
                        }

                        console.log("Fotos cadastradas com sucesso!");
                        return resolve();
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
