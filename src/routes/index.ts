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
import products from "./public/product";
import asyncHandler from "../helpers/asyncHandler";
import category from "./public/category";
import brands from "./public/brands";
import shop from "./access/shop";
import { PublicRequest } from "app-request";
import { SuccessResponse } from "../core/ApiResponse";

const router = express.Router();

/*---------------------------------------------------------*/
// router.use(apikey);

// router.use(permission(Permission.GENERAL));

/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
router.use("/auth", signup);
router.use("/role", role);

router.use("/categories", category);
router.use("/products", products);
router.use("/brands", brands);

router.use("/shop", shop);

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
