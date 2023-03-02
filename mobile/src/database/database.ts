import * as SQLite from "expo-sqlite";

export function open() {
  const database = SQLite.openDatabase("database.db");

  database.transaction((transaction) => {
    transaction.executeSql(
      `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL);`
    );
  });

  return database;
}

export function close(database: SQLite.WebSQLDatabase) {
  database.closeAsync()
}

export function deleteDatabase(database: SQLite.WebSQLDatabase) {
  database.deleteAsync();
}