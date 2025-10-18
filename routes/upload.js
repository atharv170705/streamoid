import { Router } from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadCSV } from "../controllers/uploadController.js";

const router = Router();

router.route("/").post(upload.single("file"), uploadCSV);

export default router;