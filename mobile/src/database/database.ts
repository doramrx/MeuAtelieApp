import * as SQLite from "expo-sqlite";

export const database = SQLite.openDatabase("database.db");

database.transaction((transaction) => {
    console.log("DROPPING TABLE DRESSMAKERS");
    transaction.executeSql(`DROP TABLE IF EXISTS dressmakers;`);

    console.log("DROPPING TABLE DRESSMAKERS");
    transaction.executeSql(`DROP TABLE IF EXISTS customers;`);

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
        ('Costureira 02', 'costureira2@gmail.com', '12345', 0),
        ('Costureira 03', 'costureira3@gmail.com', '12345', 0),
        ('Costureira 04', 'costureira4@gmail.com', '12345', 0),
        ('Costureira 05', 'costureira5@gmail.com', '12345', 0),
        ('Costureira 06', 'costureira6@gmail.com', '12345', 0),
        ('Costureira 07', 'costureira7@gmail.com', '12345', 0),
        ('Costureira 08', 'costureira8@gmail.com', '12345', 0),
        ('Costureira 09', 'costureira9@gmail.com', '12345', 0),
        ('Costureira 10', 'costureira10@gmail.com', '12345', 0),
        ('Costureira 11', 'costureira11@gmail.com', '12345', 0),
        ('Costureira 12', 'costureira12@gmail.com', '12345', 0),
        ('Costureira 13', 'costureira13@gmail.com', '12345', 0),
        ('Costureira 14', 'costureira14@gmail.com', '12345', 0),
        ('Costureira 15', 'costureira15@gmail.com', '12345', 0),
        ('Costureira 16', 'costureira16@gmail.com', '12345', 0),
        ('Costureira 17', 'costureira17@gmail.com', '12345', 0),
        ('Costureira 18', 'costureira18@gmail.com', '12345', 0),
        ('Costureira 19', 'costureira19@gmail.com', '12345', 0),
        ('Costureira 20', 'costureira20@gmail.com', '12345', 0),
        ('Costureira 21', 'costureira21@gmail.com', '12345', 0),
        ('Costureira 22', 'costureira22@gmail.com', '12345', 0),
        ('Costureira 23', 'costureira23@gmail.com', '12345', 0),
        ('Costureira 24', 'costureira24@gmail.com', '12345', 0),
        ('Costureira 25', 'costureira25@gmail.com', '12345', 0),
        ('Costureira 26', 'costureira26@gmail.com', '12345', 0),
        ('Costureira 27', 'costureira27@gmail.com', '12345', 0),
        ('Costureira 28', 'costureira28@gmail.com', '12345', 0),
        ('Costureira 29', 'costureira29@gmail.com', '12345', 0),
        ('Costureira 30', 'costureira30@gmail.com', '12345', 0),
        ('Costureira 31', 'costureira31@gmail.com', '12345', 0),
        ('Costureira 32', 'costureira32@gmail.com', '12345', 0),
        ('Costureira 33', 'costureira33@gmail.com', '12345', 0),
        ('Costureira 34', 'costureira34@gmail.com', '12345', 0),
        ('Costureira 35', 'costureira35@gmail.com', '12345', 0),
        ('Costureira 36', 'costureira36@gmail.com', '12345', 0);`
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
            ('Cliente 41', '4711112222');
    `);
});
