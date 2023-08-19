import * as SQLite from "expo-sqlite";

const ENV_NAME = process.env.NODE_ENV;

export const database =
  ENV_NAME && ENV_NAME === "test" ? null : SQLite.openDatabase("database.db");

// database.closeAsync();
// database.deleteAsync();

if (database) {
  database.transaction(
    (transaction) => {
      console.log("DROPPING TABLE DRESSMAKERS");
      transaction.executeSql("DROP TABLE IF EXISTS dressmakers;");

      console.log("CREATING TABLE DRESSMAKERS");
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS dressmakers 
        (
            id        INTEGER PRIMARY KEY, 
            name      TEXT NOT NULL, 
            email     TEXT NOT NULL, 
            password  TEXT NOT NULL
        );`
      );

      console.log("CREATING SOME DRESSMAKERS");
      transaction.executeSql(
        `INSERT INTO dressmakers (name, email, password) VALUES 
        ('adm', 'adm@adm.com', 'adm123'), 
        ('Costureira 01', 'costureira1@gmail.com', '12345'),
        ('Costureira 02', 'costureira2@gmail.com', '12345'),
        ('Costureira 03', 'costureira3@gmail.com', '12345'),
        ('Costureira 04', 'costureira4@gmail.com', '12345'),
        ('Costureira 05', 'costureira5@gmail.com', '12345'),
        ('Costureira 06', 'costureira6@gmail.com', '12345'),
        ('Costureira 07', 'costureira7@gmail.com', '12345'),
        ('Costureira 08', 'costureira8@gmail.com', '12345'),
        ('Costureira 09', 'costureira9@gmail.com', '12345'),
        ('Costureira 10', 'costureira10@gmail.com', '12345'),
        ('Costureira 11', 'costureira11@gmail.com', '12345'),
        ('Costureira 12', 'costureira12@gmail.com', '12345'),
        ('Costureira 13', 'costureira13@gmail.com', '12345'),
        ('Costureira 14', 'costureira14@gmail.com', '12345'),
        ('Costureira 15', 'costureira15@gmail.com', '12345'),
        ('Costureira 16', 'costureira16@gmail.com', '12345'),
        ('Costureira 17', 'costureira17@gmail.com', '12345'),
        ('Costureira 18', 'costureira18@gmail.com', '12345'),
        ('Costureira 19', 'costureira19@gmail.com', '12345'),
        ('Costureira 20', 'costureira20@gmail.com', '12345'),
        ('Costureira 21', 'costureira21@gmail.com', '12345'),
        ('Costureira 22', 'costureira22@gmail.com', '12345'),
        ('Costureira 23', 'costureira23@gmail.com', '12345'),
        ('Costureira 24', 'costureira24@gmail.com', '12345'),
        ('Costureira 25', 'costureira25@gmail.com', '12345'),
        ('Costureira 26', 'costureira26@gmail.com', '12345'),
        ('Costureira 27', 'costureira27@gmail.com', '12345'),
        ('Costureira 28', 'costureira28@gmail.com', '12345'),
        ('Costureira 29', 'costureira29@gmail.com', '12345'),
        ('Costureira 30', 'costureira30@gmail.com', '12345'),
        ('Costureira 31', 'costureira31@gmail.com', '12345'),
        ('Costureira 32', 'costureira32@gmail.com', '12345'),
        ('Costureira 33', 'costureira33@gmail.com', '12345'),
        ('Costureira 34', 'costureira34@gmail.com', '12345'),
        ('Costureira 35', 'costureira35@gmail.com', '12345'),
        ('Costureira 36', 'costureira36@gmail.com', '12345');`
      );

      console.log(
        "------------------------------------------------------------"
      );

      console.log("DROPPING TABLE CUSTOMERS");
      transaction.executeSql("DROP TABLE IF EXISTS customers;");

      console.log("CREATING TABLE CUSTOMERS");
      transaction.executeSql(`
        CREATE TABLE IF NOT EXISTS customers
        (
            id    INTEGER PRIMARY KEY,
            name  TEXT NOT NULL,
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
            ('Cliente 06', '4711112222'),
            ('Cliente 07', '4711112222'),
            ('Cliente 08', '4711112222'),
            ('Cliente 09', '4711112222'),
            ('Cliente 10', '4711112222'),
            ('Cliente 11', '4711112222'),
            ('Cliente 12', '4711112222'),
            ('Cliente 13', '4711112222'),
            ('Cliente 14', '4711112222'),
            ('Cliente 15', '4711112222'),
            ('Cliente 16', '4711112222'),
            ('Cliente 17', '4711112222'),
            ('Cliente 18', '4711112222'),
            ('Cliente 19', '4711112222'),
            ('Cliente 20', '4711112222'),
            ('Cliente 21', '4711112222'),
            ('Cliente 22', '4711112222'),
            ('Cliente 23', '4711112222'),
            ('Cliente 24', '4711112222'),
            ('Cliente 25', '4711112222'),
            ('Cliente 26', '4711112222'),
            ('Cliente 27', '4711112222');
    `);

      console.log(
        "------------------------------------------------------------"
      );

      console.log("DROPPING TABLE ORDERS");
      transaction.executeSql("DROP TABLE IF EXISTS orders;");

      console.log("CREATING TABLE ORDERS");
      transaction.executeSql(`
        CREATE TABLE IF NOT EXISTS orders (
            id 				      INTEGER PRIMARY KEY,
            cost			      REAL	NOT NULL,
            type            TEXT    CHECK (type IN ('Adjust', 'Tailored')),
            due_date		    TEXT	NOT NULL,
            created_at		  TEXT	NOT NULL,
            id_customer		  INTEGER	NOT NULL
        );
    `);

      console.log(
        "------------------------------------------------------------"
      );

      console.log("DROPPING TABLE ORDER_ITEMS");
      transaction.executeSql("DROP TABLE IF EXISTS order_items;");

      console.log("CREATING TABLE ORDER_ITEMS");
      transaction.executeSql(`
            CREATE TABLE IF NOT EXISTS order_items(
                id          INTEGER PRIMARY KEY,
                title       TEXT NOT NULL,
                description TEXT,
                id_order    INTEGER NOT NULL
            );
    `);

      console.log(
        "------------------------------------------------------------"
      );

      console.log("DROPPING TABLE ORDER_CUSTOMER_MEASURES");
      transaction.executeSql("DROP TABLE IF EXISTS order_customer_measures;");

      console.log("CREATING TABLE ORDER_CUSTOMER_MEASURES");
      transaction.executeSql(`
        CREATE TABLE IF NOT EXISTS order_customer_measures (
            id				          INTEGER PRIMARY KEY,
            id_customer_measure INTEGER NOT NULL,
            id_order_item       INTEGER NOT NULL,
            value			          REAL	NOT NULL
        );
    `);

      console.log(
        "------------------------------------------------------------"
      );

      console.log("DROPPING TABLE CUSTOMER_MEASURES");
      transaction.executeSql("DROP TABLE IF EXISTS customer_measures;");

      console.log("CREATING TABLE CUSTOMER_MEASURES");
      transaction.executeSql(`
        CREATE TABLE IF NOT EXISTS customer_measures (
            id				  INTEGER PRIMARY KEY,
            measure			TEXT	NOT NULL
        );
    `);

      console.log("CREATING SOME CUSTOMER_MEASURES");
      transaction.executeSql(`
          INSERT INTO customer_measures (measure) VALUES
          ('Abdômen'),
          ('Busto'),
          ('Cintura'),
          ('Comprimento'),
          ('Manga'),
          ('Ombro'),
          ('Punho'),
          ('Quadril');
  `);

      console.log(
        "------------------------------------------------------------"
      );

      console.log("DROPPING TABLE ADJUST_SERVICES");
      transaction.executeSql("DROP TABLE IF EXISTS adjust_services;");

      console.log("CREATING TABLE ADJUST_SERVICES");
      transaction.executeSql(`
        CREATE TABLE IF NOT EXISTS adjust_services (
            id				INTEGER PRIMARY KEY,
            description     TEXT	NOT NULL,
            cost			REAL	NOT NULL
        );
    `);

      console.log("CREATING SOME ADJUST_SERVICES");
      transaction.executeSql(`
            INSERT INTO adjust_services (description, cost) VALUES 
            ('Ajuste de manga', 10),
            ('Ajuste de barra', 10),
            ('Ajuste de punho', 10),
            ('Ajuste de comprimento', 10),
            ('Ajuste de lateral', 10),
            ('Ajuste de perna', 10),
            ('Ajuste de cintura', 10),
            ('Remendos', 10);
    `);

      console.log(
        "------------------------------------------------------------"
      );

      console.log("DROPPING TABLE ORDERED_SERVICES");
      transaction.executeSql("DROP TABLE IF EXISTS ordered_services;");

      console.log("CREATING TABLE ORDERED_SERVICES");
      transaction.executeSql(`
        CREATE TABLE IF NOT EXISTS ordered_services (
            id                  INTEGER PRIMARY KEY,
            id_adjust_service   INTEGER NOT NULL,
            id_order_item       INTEGER NOT NULL,
            cost                REAL    NOT NULL
        );
    `);

      console.log(
        "------------------------------------------------------------"
      );

      console.log("DROPPING TABLE CLOTHING_PHOTOS");
      transaction.executeSql("DROP TABLE IF EXISTS clothing_photos;");

      console.log("CREATING TABLE CLOTHING_PHOTOS");
      transaction.executeSql(`
            CREATE TABLE IF NOT EXISTS clothing_photos (
                id              INTEGER PRIMARY KEY,
                photo           TEXT    NOT NULL,
                id_order_item   INTEGER NOT NULL
            );
    `);
    },
    (error) => {
      console.log(error);
    }
  );
}
