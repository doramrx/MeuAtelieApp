import { database } from "../database/database";

export interface AdjustRawData {
  id: number;
  description: string;
  cost: number;
}

interface AdjustServiceData {
  /**
   * @function getAdjusts
   * @returns adjust services list
   */
  getAdjusts: () => Promise<AdjustRawData[]>;
  /**
   * @function getAdjustsExclusive
   * @param adjustIds adjusts to not fetch
   * @returns adjust services list
   */
  getAdjustsExclusive: (adjustIds: number[]) => Promise<AdjustRawData[]>;
}

export function useAdjustServiceModel(): AdjustServiceData {
  function getAdjusts(): Promise<AdjustRawData[]> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            "SELECT id, description, cost FROM adjust_services;",
            undefined,
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
          console.log("[Model] Adjust services fetched successfully!");
        }
      );
    });
  }

  function getAdjustsExclusive(adjustIds: number[]): Promise<AdjustRawData[]> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            `SELECT id, description, cost 
            FROM adjust_services 
            WHERE id NOT IN (${adjustIds.join(",")});`,
            undefined,
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
          console.log("[Model] Adjust services fetched successfully!");
        }
      );
    });
  }

  return {
    getAdjusts,
    getAdjustsExclusive,
  };
}
