import express from "express";
import { adminController } from "../../controllers/admin.controller";

const router = express.Router();

router.get("/", adminController.getBranch);

export default router;
