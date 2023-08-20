import { database } from "../database/database";

export interface CustomerRawData {
  id: number;
  name: string;
  phone: string;
}

interface CustomerModelData {
  /**
   * @function getCustomers
   * @param pageLimit max records to fetch
   * @param offset
   * @returns a customer list
   */
  getCustomers: (
    pageLimit: number,
    offset: number
  ) => Promise<CustomerRawData[]>;
  /**
   * @function getCustomerById
   * @param id customer id
   * @returns a customer
   */
  getCustomerById: (id: number) => Promise<CustomerRawData>;
  /**
   * @function deleteCustomer
   * @param id customer id
   * @returns deleted customer id
   */
  deleteCustomer: (id: number) => Promise<number>;
}

export function useCustomerModel(): CustomerModelData {
  function deleteCustomer(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            "DELETE FROM customers WHERE id = ?;",
            [id],
            (_, resultSet) => {
              console.log(resultSet);
              resultSet.rowsAffected === 1 ? resolve(id) : reject(null);
            }
          );
        },
        (error) => {
          console.log(error);
          reject(null);
        },
        () => {
          console.log("[Model] Customer deleted successfully!");
        }
      );
    });
  }

  function getCustomers(
    pageLimit: number,
    offset: number
  ): Promise<CustomerRawData[]> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            `SELECT id, name, phone FROM customers LIMIT ${pageLimit} OFFSET ${offset};`,
            undefined,
            (_, resultSet) => {
              const customerRawData: CustomerRawData[] =
                resultSet.rows._array.map((row) => {
                  return {
                    id: row.id,
                    name: row.name,
                    phone: row.phone,
                  };
                });

              resolve(customerRawData);
            }
          );
        },
        (error) => {
          console.log(error);
          reject(null);
        },
        () => {
          console.log("[Model]Customer fetched successfully!");
        }
      );
    });
  }

  function getCustomerById(id: number): Promise<CustomerRawData> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            "SELECT id, name, phone FROM customers WHERE id = ?;",
            [id],
            (_, resultSet) => {
              if (resultSet.rows.length !== 0) {
                resolve(resultSet.rows.item(0));
              } else {
                reject(null);
              }
            }
          );
        },
        (error) => {
          console.log(error);
          reject(null);
        },
        () => {
          console.log("[Model] Customer fetched successfully!");
        }
      );
    });
  }

  return {
    getCustomers,
    getCustomerById,
    deleteCustomer,
  };
}
