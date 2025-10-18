import { Router } from "express";
import { listProducts, searchProducts } from "../controllers/productController.js"

const router = Router();

router.route("/").get(listProducts);
router.route("/search").get(searchProducts);

export default router;