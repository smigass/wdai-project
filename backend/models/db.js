import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Users (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    Email TEXT UNIQUE NOT NULL,
    Password TEXT NOT NULL,
    FirstName TEXT,
    LastName TEXT,
    Address TEXT,
    Phone TEXT,
    Role TEXT DEFAULT 'user'
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS Products (
    ProductID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Description TEXT,
    Price REAL NOT NULL,
    Image TEXT,
    InStock INTEGER NOT NULL DEFAULT 0,
    CategoryID INTEGER,
    OrdersCount INTEGER DEFAULT 0
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS Categories (
    CategoryID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS Orders (
    OrderID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    TotalPrice REAL NOT NULL,
    OrderDate TEXT NOT NULL
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS Carts (
    CartID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    ProductID INTEGER NOT NULL,
    Quantity INTEGER NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS Opinions (
    OpinionID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    ProductID INTEGER NOT NULL,
    Rating DECIMAL(10,2) NOT NULL,
    Body TEXT
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS Newsletter (
    UserID INTEGER PRIMARY KEY
  );`);
});

export { db };
