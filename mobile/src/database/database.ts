import * as SQLite from "expo-sqlite";

export const database = SQLite.openDatabase("database.db");

// database.closeAsync();
// database.deleteAsync();

database.transaction((transaction) => {

  console.log("DROPPING TABLE USERS");

  transaction.executeSql(
    `DROP TABLE IF EXISTS users;`
  );

  console.log("CREATING TABLE USERS");
  transaction.executeSql(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL);`
  );

  console.log("CREATING ADM USER");
  transaction.executeSql(
    `INSERT INTO users (name, email, password) VALUES ('administrator', 'adm@gmail.com', 'adm123');`
  );
});
