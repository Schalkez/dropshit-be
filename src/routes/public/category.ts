import express from "express";
import { adminController } from "../../controllers/admin.controller";

const router = express.Router();

router.get("/", adminController.getCategory);

router.get("/:id", adminController.getCategoryById);

export default router;
