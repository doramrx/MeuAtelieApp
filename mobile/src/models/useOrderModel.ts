import { database } from "../database/database";

type RawOrderType = "Tailored" | "Adjust";

export interface OrderRawData {
  id: number;
  title: string;
  due_date: string;
  type: RawOrderType;
  customer_name: string;
  delivered_at: string | null;
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
  /**
   * @function getOrdersByMonth
   * @param month month to fetch orders. The month range is 1-12
   * @returns raw order list
   */
  getOrdersByMonth: (month: number) => Promise<OrderRawData[]>;
  /**
   * @function isOrderFinished
   * @param order id
   * @retuns true if the order is finished; false otherwise
   */
  isOrderFinished: (id: number) => Promise<boolean>;
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

  function getOrdersByMonth(month: number): Promise<OrderRawData[]> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            `SELECT 
            ord.id,
            ori.title,
            ord.due_date,
            ord.type,
            csm.name customer_name,
            ord.delivered_at
          FROM orders AS ord
          JOIN order_items AS ori ON ori.id_order = ord.id
          JOIN customers AS csm ON csm.id = ord.id_customer
          WHERE strftime('%m', ord.due_date) = ?;`,
            [month.toString().padStart(2, "0")],
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

  function isOrderFinished(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      database?.transaction((transaction) => {
        transaction.executeSql(
          "SELECT delivered_at FROM orders WHERE id = ?;",
          [id],
          (_, resultSet) => {
            const finished = resultSet.rows._array[0].delivered_at !== null;
            resolve(finished);
          }
        );
      });
    });
  }

  return {
    getOrders,
    finishOrder,
    getOrdersByMonth,
    isOrderFinished,
  };
}
