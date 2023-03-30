import * as SQLite from "expo-sqlite";

export const database = SQLite.openDatabase("database.db");

database.transaction((transaction) => {
    console.log("DROPPING TABLE DRESSMAKERS");
    transaction.executeSql(`DROP TABLE IF EXISTS dressmakers;`);

    console.log("CREATING TABLE DRESSMAKERS");
    transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS dressmakers 
        (
            id INTEGER PRIMARY KEY, 
            name TEXT NOT NULL, 
            email TEXT NOT NULL, 
            phoneNumber TEXT NOT NULL, 
            password TEXT NOT NULL,
            isAdm BOOLEAN NOT NULL DEFAULT 0
        );`
    );

    console.log("CREATING SOME DRESSMAKERS");
    transaction.executeSql(
        `INSERT INTO dressmakers (name, email, phoneNumber, password, isAdm) VALUES 
        ('adm', 'adm@adm.com', '(47) 9 4432-3912', 'adm123', 1), 
        ('Costureira 01', 'costureira01@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 02', 'costureira02@gmail.com', '(47) 9 4432-3912', '12345', 0);`
    );
});
