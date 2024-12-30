import express from "express";
import validator from "../../helpers/validator";
import schema from "./schema";
import { AuthControllers } from "../../controllers/auth.controller";
import { adminController } from "../../controllers/admin.controller";
import { UserControllers } from "../../controllers/user.controller";

const router = express.Router();

router.post("/signup", AuthControllers.signUp);

router.get("/up", AuthControllers.up);

router.post("/signin", AuthControllers.signIn);

router.post("/signinAdmin", AuthControllers.signinAdmin);

router.get("/category", adminController.getCategory);

router.get("/branch", adminController.getBranch);

router.get(
  "/getProductByCategory/:category",
  UserControllers.getProductByCategory
);

router.get("/getProductDetail/:id", UserControllers.getProductDetail);

router.get("/getProductsFilter", UserControllers.getProductsFilter);

router.get("/shop-detail/:id", UserControllers.getShopDetail);

router.get("/getProductsByStore/:user", UserControllers.getProductsByStore);

router.get("/searchDataUser", UserControllers.searchDataUser);

router.get("/new", AuthControllers.getProductsNews);

router.get("/getProductsFeature", AuthControllers.getProductsFeature);

router.get("/getProductsBestSelling", AuthControllers.getProductsBestSelling);

export default router;
