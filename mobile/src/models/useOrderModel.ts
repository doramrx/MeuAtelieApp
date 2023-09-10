import { database } from "../database/database";

type RawOrderType = "Tailored" | "Adjust";

export interface OrderRawData {
  id: number;
  title: string;
  due_date: string;
  type: RawOrderType;
}

interface OrderModelData {
  /**
   * @function getOrders
   * @returns raw order list
   */
  getOrders: () => Promise<OrderRawData[]>;
  /**
   * @function finishOrder
   * @param id order id
   * @returns void
   */
  finishOrder: (id: number) => Promise<void>;
}

export function useOrderModel(): OrderModelData {
  function getOrders(): Promise<OrderRawData[]> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            `SELECT 
            ord.id,
            ori.title,
            ord.due_date,
            ord.type
          FROM orders AS ord
          JOIN order_items AS ori ON ori.id_order = ord.id;`,
            undefined,
            (_, resultSet) => {
              resolve(resultSet.rows._array as OrderRawData[]);
            }
          );
        },
        (error) => {
          console.log(error);
          reject(null);
        },
        () => {
          console.log("[Model] Order fetched successfully!");
        }
      );
    });
  }

  function finishOrder(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            "UPDATE orders SET delivered_at = ? WHERE id = ?;",
            [new Date().toISOString(), id],
            (_, resultSet) => {
              resultSet.rowsAffected === 1 ? resolve() : reject();
            }
          );
        },
        (error) => {
          console.log(error);
          reject(null);
        },
        () => {
          console.log("[Model] Order finished successfully!");
        }
      );
    });
  }

  return {
    getOrders,
    finishOrder,
  };
}
