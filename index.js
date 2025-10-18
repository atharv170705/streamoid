import express from "express";
import uploadRoutes from "./routes/upload.js";
import productRoutes from "./routes/product.js";


const app = express();
app.use(express.json());

app.use("/upload", uploadRoutes);
app.use("/products", productRoutes);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})