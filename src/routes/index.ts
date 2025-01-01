import express from "express";
// import { Permission } from "../database/model/ApiKey";
// import apikey from "../auth/apikey";
// import permission from "../helpers/permission";
import signup from "./access/auth";
import lot from "./access/lottery";
import me from "./access/user";
import role from "./access/role";
import admin from "./access/admin";
import upload from "./upload";
import asyncHandler from "../helpers/asyncHandler";
import { PublicRequest } from "app-request";
import { SuccessResponse } from "../core/ApiResponse";
import { adminController } from "../controllers/admin.controller";

const router = express.Router();

/*---------------------------------------------------------*/
// router.use(apikey);

// router.use(permission(Permission.GENERAL));

/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
router.use("/auth", signup);
router.use("/role", role);
router.use("/categories", adminController.getCategory);
router.get("/branch", adminController.getBranch);
router.use("/profile", me);
router.use("/upload", upload);
router.use("/loterry", lot);
router.use("/admin", admin);
router.get(
  "/check",
  asyncHandler(async (req: PublicRequest, res) => {
    new SuccessResponse("OK", true).send(res);
  })
);
export default router;
