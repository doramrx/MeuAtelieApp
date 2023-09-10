import { database } from "../database/database";

export interface MeasureRawData {
  id: number;
  measure: string;
}

interface MeasureData {
  /**
   * @function getMeasures
   * @returns measure list
   */
  getMeasures: () => Promise<MeasureRawData[]>;
}

export function useMeasureModel(): MeasureData {
  function getMeasures(): Promise<MeasureRawData[]> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            "SELECT id, measure FROM customer_measures;",
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
          console.log("[Model] Measures fetched successfully!");
        }
      );
    });
  }

  return {
    getMeasures,
  };
}
