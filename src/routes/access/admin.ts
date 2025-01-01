import express from "express";
import { UserControllers } from "../../controllers/user.controller";
import authentication from "../../auth/authentication";
import authorization from "../../auth/authorization";
import { RoleCode } from "../../database/model/Role";
import role from "../../helpers/role";
import { adminController } from "../../controllers/admin.controller";

const router = express.Router();

router.use(
  authentication,
  role(RoleCode.ADMIN, RoleCode.EMPLOYEE),
  authorization
);

router.get("/users", adminController.getUsers);

router.post("/user", adminController.addUsers);

router.get("/banks", adminController.getBanks);

router.post("/add-banks", adminController.addbankInfo);
router.delete("/delete-bank/:id", adminController.deletebank);
router.post("/user-update", adminController.update);

router.delete("/user/:id", adminController.deleteUser);

router.get("/payments", adminController.getPayments);

router.get("/with-draws", adminController.getWithdraws);

router.post("/resolve-payment", adminController.resolvePayment);

router.post("/resolve-with-draw", adminController.resolveWithDraw);

router.get("/results", adminController.getHistoryResult);

router.post("/update-result", adminController.updateResult);

router.get("/history-buy", adminController.historyBuy);

router.get("/history-buy", adminController.historyBuy);

router.delete("/delet-history/:id", adminController.deleteUserHistory);

router.delete("/delet-withdraw/:id", adminController.deletWithdraw);

router.delete("/delet-payment/:id", adminController.deletePayment);

router.post("/update-status", adminController.changeStatusUser);

router.get("/logs", adminController.getLogs);
router.get("/branch", adminController.getBranch);
router.post("/branch", adminController.addBranch);
router.post("/branch-delete", adminController.deleteBranch);

router.get("/category", adminController.getCategory);
router.get("/category/:id", adminController.getCategoryById);
router.post("/category", adminController.addCategory);
router.delete("/category/:id/:subId?", adminController.deleteCategory);

router.post("/product", adminController.addProduct);
router.get("/product", adminController.getProduct);
router.post("/product-delete", adminController.deleteProduct);

router.post("/addEmployee", adminController.addEmployee);

router.get("/package", adminController.getPacke);

router.get("/all-stores", UserControllers.getAllStore);
router.get("/all-order", UserControllers.getOrderAll);
router.post("/add-package", adminController.addPackage);
router.post("/delete-package", adminController.deletePackage);
router.post("/add-default-package", adminController.setDefaultPackage);

router.post("/addBankMethod", adminController.addBankMethod);
router.post("/deleteMethodBank/:id", adminController.deleteMethodBank);
router.get("/getBankMethod", adminController.getBankMethod);
router.post("/verifyShop", adminController.verifyShop);
router.post("/setConfig", adminController.setConfig);
router.get("/getConfig", adminController.getConfig);
router.post("/deleteConfig/:id", adminController.deleteConfig);

router.get("/getUserProfile/:id", UserControllers.getUserProfile);
router.post("/updateProfileUser", UserControllers.updateProfileUser);

router.post("/updateEmploy", UserControllers.updateEmploy);
export default router;
