import csv from "csv-parser";
import dbPromise from "../db.js"
import { Readable } from "stream";

export const uploadCSV = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({error : "No file was uploaded"});
        }

        const results = [];
        const failed = [];
        const db = await dbPromise;

        const stream = Readable.from(req.file.buffer);

        stream
            .pipe(csv())
            .on("data", (row) => {
                const {sku,name,brand,color,size,mrp,price,quantity} = row;
                if (!sku || !name || !brand || !mrp || !price) {
                    failed.push({sku, reason : "missing the required fields"});
                    return;
                }
                const mrpNum = parseFloat(mrp);
                const priceNum = parseFloat(price);
                const quantityNum = parseFloat(quantity);

                if (isNaN(mrpNum) || isNaN(priceNum) || priceNum > mrpNum || quantityNum < 0) {
                    failed.push({sku, reason : "invalid fields"});
                    return;
                }

                results.push({
                    sku,
                    name,
                    brand,
                    color,
                    size,
                    mrp: mrpNum,
                    price: priceNum,
                    quantity: quantityNum || 0
                });
            })
            .on("end", async () => {
                let storedCount = 0;
                for (const prod of results) {
                    try {
                        await db.run(
                            `INSERT OR REPLACE INTO products (sku, name, brand, color, size, mrp, price, quantity)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                            [prod.sku, prod.name, prod.brand, prod.color, prod.size, prod.mrp, prod.price, prod.quantity]
                        );
                        storedCount++;
                    } catch (err) {
                        failed.push({ sku: prod.sku, reason: err.message });
                    }
                }
                res.json({ stored: storedCount, failed });
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};