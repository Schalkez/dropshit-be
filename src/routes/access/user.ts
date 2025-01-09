import express from "express";
import validator from "../../helpers/validator";
import schema from "./schema";
import { AuthControllers } from "../../controllers/auth.controller";
import authentication from "../../auth/authentication";
import { UserControllers } from "../../controllers/user.controller";
import { adminController } from "../../controllers/admin.controller";

const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(authentication);
/*-------------------------------------------------------------------------*/

router.post("/refresh", AuthControllers.refresh);

router.post("/update-bank", UserControllers.updateBank);

router.post("/payment", UserControllers.payment);

router.post("/withdraw", UserControllers.withDraw);

router.post("/buy-ticket", UserControllers.buyTicket);

router.get("/lottery-now", UserControllers.lotteryNow);

router.get("/history-lottery", UserControllers.historyLottery);

router.get("/banks", UserControllers.gteBanks);

router.get("/me", UserControllers.getMe);

router.get("/history-payments", UserControllers.getHistoryPayments);

router.get("/history-withdraws", UserControllers.getHistoryWithDraws);

router.delete("/logout", AuthControllers.logout);

router.post("/add-virtual", UserControllers.addVirtualCustomer);

router.get("/get-virtual", UserControllers.getVirtualCustomer);

router.get("/category", adminController.getCategory);

router.post("/add-product", UserControllers.addProduct);
router.get("/get-product-user/:id", UserControllers.gteProductByUser);
router.get("/get-shop-products/:id", UserControllers.getShopProducts);
router.get("/get-products-store", UserControllers.getProductsStore);

router.post("/add-product-store", UserControllers.addProductUser);
router.post("/buyPack", UserControllers.buyPack);
router.get("/packages", UserControllers.getPackage);

router.post("/verifyShop", UserControllers.verifyShop);
router.post("/updateInfoShop", UserControllers.updateInfoShop);
router.post("/add-order", UserControllers.addCart);

router.post("/updateOrder", UserControllers.updateOrder);

router.get("/seller-by-employee", UserControllers.getSellerByEmployee);
router.get("/getOrderByEmployee", UserControllers.getOrderByEmployee);
router.get("/getOrderByStore", UserControllers.getOrderByStore);
router.get("/getBankMethod", adminController.getBankMethod);
router.post("/updateUserAddress", UserControllers.updateUserAddress);
router.post("/resolvePaymentOrder", UserControllers.resolvePaymentOrder);
router.get("/getMessage", UserControllers.getMessage);
router.get("/getRoom", UserControllers.getRoom);
router.post("addMessage", UserControllers.addMessage);

router.get("/getDataShop", UserControllers.getDataShop);
router.post("/chatMessage", UserControllers.chatMessage);
router.get("/getMessageUser/:id", UserControllers.getMessageUser);
router.get("/getMessageStore/:id", UserControllers.getMessageStore);
router.get("/getConservationUser/:id", UserControllers.getConservationUser);
router.get("/getConservationStore/:id", UserControllers.getConservationStore);

router.get("/getOrderNotPayment", UserControllers.getOrderNotPayment);

export default router;
