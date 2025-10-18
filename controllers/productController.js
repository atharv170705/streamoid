import dbPromise from "../db.js";

export const listProducts = async (req, res) => {
    const db = await dbPromise;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const products = await db.all(`SELECT * FROM products LIMIT ? OFFSET ?`, [
        limit,
        offset
    ]);
    res.json(products);

};

export const searchProducts = async (req, res) => {
    const db = await dbPromise;
    const {brand, color, minPrice, maxPrice} = req.query;
    const conditions = [];
    const params = [];

    if(brand) {
        conditions.push("brand = ?");
        params.push(brand);
    }
    if(color) {
        conditions.push("color = ?");
        params.push(color);
    }
    if(minPrice) {
        conditions.push("price >= ?");
        params.push(minPrice);
    }
    if(maxPrice) {
        conditions.push("price <= ?");
        params.push(maxPrice);
    }

    const whereClause = conditions.length ? "WHERE " + conditions.join(" AND ") : "";
    const query = `SELECT * FROM products ${whereClause}`;
    const products = await db.all(query, params);
    res.json(products);
};