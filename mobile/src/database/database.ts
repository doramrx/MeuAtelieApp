import * as SQLite from "expo-sqlite";

export const database = SQLite.openDatabase("database.db");

database.transaction((transaction) => {
    console.log("DROPPING TABLE USERS");
    transaction.executeSql(`DROP TABLE IF EXISTS users;`);

    console.log("DROPPING TABLE DRESSMAKERS");
    transaction.executeSql(`DROP TABLE IF EXISTS dressmakers;`);

    console.log("CREATING TABLE USERS");
    transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL);`
    );

    console.log("CREATING ADM USER");
    transaction.executeSql(
        `INSERT INTO users (name, email, password) VALUES ('administrator', 'adm@gmail.com', 'adm123');`
    );

    console.log("CREATING TABLE DRESSMAKERS");
    transaction.executeSql(
        "CREATE TABLE IF NOT EXISTS dressmakers (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, phoneNumber TEXT NOT NULL);"
    );
});
