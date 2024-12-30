import express from "express";
import { RoleControllers } from "../../controllers/role.controller";

const router = express.Router();

router.post("/", RoleControllers.create);

export default router;
