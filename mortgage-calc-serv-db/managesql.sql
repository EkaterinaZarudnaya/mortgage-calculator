/*CREATE TABLE banks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name text NOT NULL UNIQUE,
  rate REAL NOT NULL,
  maxloan INTEGER NOT NULL,
  minpay INTEGER NOT NULL,
  term INTEGER NOT NULL
);*/

/*INSERT INTO banks (name,rate,maxloan,minpay,term)
VALUES("Globus Bank", 8.98, 3000000, 30, 20);*/


/*INSERT INTO banks (name,rate,maxloan,minpay,term)
VALUES
    ("Pravex Bank", 9.99, 4000000, 40, 20),
    ("Oschadbank", 9.99, 4000000, 20, 15),
    ("Privatbank", 9.99, 2000000, 30, 20),
    ("KredoBank", 10, 4000000, 20, 20);*/


SELECT * FROM banks;