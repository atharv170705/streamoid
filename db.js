import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dbPromise = open({
  filename: "./products.db",
  driver: sqlite3.Database
});

(async () => {
    const db = await dbPromise;
    await db.exec(`
        CREATE TABLE IF NOT EXISTS products(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sku TEXT UNIQUE,
            name TEXT,
            brand TEXT,
            color TEXT,
            size TEXT,
            mrp REAL,
            price REAL,
            quantity INTEGER
        )    
    `)
})();

export default dbPromise;