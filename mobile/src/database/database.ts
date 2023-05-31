import * as SQLite from "expo-sqlite";

export const database = SQLite.openDatabase("database.db");

database.transaction((transaction) => {
    console.log("DROPPING TABLE DRESSMAKERS");
    transaction.executeSql(`DROP TABLE IF EXISTS dressmakers;`);

    console.log("DROPPING TABLE CUSTOMERS");
    transaction.executeSql(`DROP TABLE IF EXISTS customers;`);

    console.log("DROPPING TABLE ORDERS");
    transaction.executeSql(`DROP TABLE IF EXISTS orders;`);

    console.log("DROPPING TABLE CUSTOMER MEASURES");
    transaction.executeSql(`DROP TABLE IF EXISTS customer_measures;`);

    console.log("CREATING TABLE DRESSMAKERS");
    transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS dressmakers 
        (
            id INTEGER PRIMARY KEY, 
            name TEXT NOT NULL, 
            email TEXT NOT NULL, 
            password TEXT NOT NULL,
            isAdm BOOLEAN NOT NULL DEFAULT 0
        );`
    );

    console.log("CREATING SOME DRESSMAKERS");
    transaction.executeSql(
        `INSERT INTO dressmakers (name, email, password, isAdm) VALUES 
        ('adm', 'adm@adm.com', 'adm123', 1), 
        ('Costureira 01', 'costureira1@gmail.com', '12345', 0),
        ('Costureira 02', 'costureira2@gmail.com', '12345', 0);`
    );

    console.log("CREATING TABLE CUSTOMERS");
    transaction.executeSql(`
        CREATE TABLE IF NOT EXISTS customers
        (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            phone TEXT NOT NULL
        );
    `);

    console.log("CREATING SOME CUSTOMERS");
    transaction.executeSql(`
            INSERT INTO customers (name, phone) VALUES 
            ('Cliente 01', '4711112222'),
            ('Cliente 02', '4711112222'),
            ('Cliente 03', '4711112222'),
            ('Cliente 04', '4711112222'),
            ('Cliente 05', '4711112222'),
            ('Cliente 06', '4711112222');
    `);

    console.log("CREATING TABLE ORDERS");
    transaction.executeSql(`
        CREATE TABLE orders (
            id 				INTEGER PRIMARY KEY,
            title			TEXT	NOT NULL,
            description		TEXT,
            cost			REAL	NOT NULL,
            dueDate			TEXT	NOT NULL,
            type            TEXT    CHECK (type IN ('RepairOrAdjust', 'Tailored')),
            createdAt		TEXT	NOT NULL
        );
    `);

    console.log("CREATING TABLE CUSTOMER_MEASURES");
    transaction.executeSql(`
        CREATE TABLE customer_measures (
            id				INTEGER PRIMARY KEY,
            measure			TEXT	NOT NULL,
            value			REAL	NOT NULL,
            id_customer		INTEGER	NOT NULL,
            id_order		INTEGER NOT NULL
        );
    `);
});
