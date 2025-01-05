import express from "express";
import { adminController } from "../../controllers/admin.controller";

const router = express.Router();

router.get("/", adminController.getProduct);
router.get("/:id", adminController.getProductById);

export default router;
