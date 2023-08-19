import { database } from "../database/database";

export interface DressmakerRawData {
  id: number;
  name: string;
  email: string;
}

interface DressmakerModelData {
  /**
   * @function getDressmakerById
   * @param id dressmaker id
   * @returns dressmaker raw data or null.
   */
  getDressmakerById: (id: number) => Promise<DressmakerRawData>;
  /**
   * @function deleteDressmaker
   * @param id dressmaker id
   * @returns deleted dressmaker id if succeeded or null otherwise.
   */
  deleteDressmaker: (id: number) => Promise<number>;
  /**
   * @function getDressmakerIdByEmailAndPassword
   * @param email dressmaker email
   * @param password dressmaker password
   * @returns number | null dressmaker id if exists, null otherwise
   */
  getDressmakerIdByEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<number | null>;
}

export function useDressmakerModel(): DressmakerModelData {
  function getDressmakerById(id: number): Promise<DressmakerRawData> {
    return new Promise((resolve, reject) => {
      database &&
        database.transaction(
          (transaction) => {
            transaction.executeSql(
              "SELECT id, name, email FROM dressmakers WHERE id = ?;",
              [id],
              (_, resultSet) => {
                if (resultSet.rows.length > 0) {
                  return resolve(resultSet.rows.item(0));
                }

                reject(null);
              }
            );
          },
          (error) => {
            console.log(error);
            reject(null);
          },
          () => {
            console.log("[Model] - Dressmaker fetched successfully!");
          }
        );
    });
  }

  function deleteDressmaker(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      database &&
        database.transaction(
          (transaction) => {
            transaction.executeSql(
              "DELETE FROM dressmakers WHERE id = ?",
              [id],
              (_, resultSet) => {
                resultSet.rowsAffected > 0 ? resolve(id) : reject(null);
              }
            );
          },
          (error) => {
            console.log(error);
            return reject(null);
          },
          () => {
            console.log("Dressmaker deleted successfully!");
          }
        );
    });
  }

  function getDressmakerIdByEmailAndPassword(
    email: string,
    password: string
  ): Promise<number | null> {
    return new Promise((resolve, reject) => {
      database &&
        database.transaction(
          (transaction) => {
            transaction.executeSql(
              "SELECT id FROM dressmakers WHERE email = ? AND password = ?;",
              [email, password],
              (_, resultSet) => {
                if (resultSet.rows.length === 1) {
                  resolve(resultSet.rows.item(0).id);
                } else {
                  reject(null);
                }
              }
            );
          },
          (error) => {
            console.log(error);
            return reject(null);
          },
          () => {
            console.log("[Model] Checking dressmaker email and password done!");
          }
        );
    });
  }

  return {
    getDressmakerById,
    deleteDressmaker,
    getDressmakerIdByEmailAndPassword,
  };
}
