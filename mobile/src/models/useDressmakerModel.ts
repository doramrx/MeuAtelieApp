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
  deleteDressmaker: (id: number) => Promise<boolean>;
  /**
   * @function getDressmakerIdByEmailAndPassword
   * @param email dressmaker email
   * @param password dressmaker password
   * @returns number | null dressmaker id if exists, null otherwise
   */
  getDressmakerIdByEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<number>;
  /**
   * @function checkIfExists
   * @param email dressmaker email
   * @returns boolean true if exists a dressmaker with the specified email
   */
  checkIfExists(email: string): Promise<boolean>;
  /**
   * @function createDressmaker
   * @param name dressmaker name
   * @param email dressmaker email
   * @param password dressmaker password
   * @returns number created dressmaker ID
   */
  createDressmaker: (
    name: string,
    email: string,
    password: string
  ) => Promise<number>;
  /**
   * @function updateDressmaker
   * @param dressmakerId
   * @param name
   * @param email
   */
  updateDressmaker: (
    dressmakerId: number,
    name: string,
    email: string
  ) => Promise<void>;
}

export function useDressmakerModel(): DressmakerModelData {
  function getDressmakerById(id: number): Promise<DressmakerRawData> {
    return new Promise((resolve, reject) => {
      database?.transaction(
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

  function deleteDressmaker(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            "DELETE FROM dressmakers WHERE id = ?",
            [id],
            (_, resultSet) => {
              resultSet.rowsAffected > 0 ? resolve(true) : reject(false);
            }
          );
        },
        (error) => {
          console.log(error);
          return reject(false);
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
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      database?.transaction(
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

  function checkIfExists(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            "SELECT id FROM dressmakers WHERE email = ?;",
            [email],
            (_, resultSet) => {
              const dressmakerExists = resultSet.rows.length !== 0;
              resolve(dressmakerExists);
            }
          );
        },
        (error) => {
          console.log(error);
          reject(null);
        },
        () => {
          console.log("Cheking if dressmaker exists done!");
        }
      );
    });
  }

  function createDressmaker(
    name: string,
    email: string,
    password: string
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            "INSERT INTO dressmakers (name, email, password) VALUES (?, ?, ?);",
            [name, email, password],
            (_, resultSet) => {
              const dressmakerId = resultSet.insertId;

              if (dressmakerId) {
                resolve(dressmakerId);
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
          console.log("Dressmaker created successfully!");
        }
      );
    });
  }

  function updateDressmaker(
    dressmakerId: number,
    name: string,
    email: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      database?.transaction(
        (transaction) => {
          transaction.executeSql(
            "SELECT id FROM dressmakers WHERE email = ? AND NOT id = ?;",
            [email, dressmakerId],
            (_, resultSet) => {
              if (resultSet.rows.length !== 0) {
                return reject("Email em uso");
              }

              transaction.executeSql(
                "UPDATE dressmakers SET name = ?, email = ? WHERE id = ?;",
                [name, email, dressmakerId],
                (_, resultSet) => {
                  if (resultSet.rowsAffected !== 1) {
                    return reject(
                      "Não foi possível editar os dados da costureira!"
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
          console.log("[Model] Dressmaker updated successfully");
        }
      );
    });
  }

  return {
    getDressmakerById,
    deleteDressmaker,
    getDressmakerIdByEmailAndPassword,
    checkIfExists,
    createDressmaker,
    updateDressmaker,
  };
}
