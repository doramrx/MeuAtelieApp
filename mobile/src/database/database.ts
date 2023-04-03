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
        ('Costureira 02', 'costureira02@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 03', 'costureira03@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 04', 'costureira04@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 05', 'costureira05@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 06', 'costureira06@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 07', 'costureira07@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 08', 'costureira08@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 09', 'costureira09@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 10', 'costureira10@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 11', 'costureira11@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 12', 'costureira12@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 13', 'costureira13@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 14', 'costureira14@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 15', 'costureira15@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 16', 'costureira16@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 17', 'costureira17@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 18', 'costureira18@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 19', 'costureira19@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 20', 'costureira20@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 21', 'costureira21@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 22', 'costureira22@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 23', 'costureira23@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 24', 'costureira24@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 25', 'costureira25@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 26', 'costureira26@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 27', 'costureira27@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 28', 'costureira28@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 29', 'costureira29@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 30', 'costureira30@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 31', 'costureira31@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 32', 'costureira32@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 33', 'costureira33@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 34', 'costureira34@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 35', 'costureira35@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 36', 'costureira36@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 37', 'costureira37@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 38', 'costureira38@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 39', 'costureira39@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 40', 'costureira40@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 41', 'costureira41@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 42', 'costureira42@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 43', 'costureira43@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 44', 'costureira44@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 45', 'costureira45@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 46', 'costureira46@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 47', 'costureira47@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 48', 'costureira48@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 49', 'costureira49@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 50', 'costureira50@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 51', 'costureira51@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 52', 'costureira52@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 53', 'costureira53@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 54', 'costureira54@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 55', 'costureira55@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 56', 'costureira56@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 57', 'costureira57@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 58', 'costureira58@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 59', 'costureira59@gmail.com', '(47) 9 4432-3912', '12345', 0),
        ('Costureira 60', 'costureira60@gmail.com', '(47) 9 4432-3912', '12345', 0);`
    );
});
