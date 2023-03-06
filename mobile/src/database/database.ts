import * as SQLite from "expo-sqlite";

export const database = SQLite.openDatabase("database.db");

// database.closeAsync();
// database.deleteAsync();

database.transaction((transaction) => {

  transaction.executeSql(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL);`
  );
});
