import { database } from "../database/database";

export interface OrderRawData {
  id: number;
  title: string;
  due_date: string;
  type: string;
}

interface OrderModelData {
  /**
   * @function getOrders
   * @returns raw order list
   */
  getOrders: () => Promise<OrderRawData[]>;
}

export function useOrderModel(): OrderModelData {
  function getOrders(): Promise<OrderRawData[]> {
    return new Promise((resolve, reject) => {
      database?.transaction((transaction) => {
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
        )
      }, (error) => {
        console.log(error);
        reject(null);
      }, () => {
        console.log("[Model] Order fetched successfully!");
      })
    })
  }

  return {
    getOrders
  };
}