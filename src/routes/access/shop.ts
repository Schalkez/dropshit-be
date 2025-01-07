import express from "express";
import authentication from "../../auth/authentication";
import authorization from "../../auth/authorization";
import { RoleCode } from "../../database/model/Role";
import role from "../../helpers/role";
import { UserControllers } from "../../controllers/user.controller";

const router = express.Router();

router.use(authentication, role(RoleCode.SELLER), authorization);

router.get("/shops", (req, res) => {
  console.log((req as any).user);
  res.send("Hello");
});

router.get("/getOrderByStore", UserControllers.getOrderByStore);

export default router;
