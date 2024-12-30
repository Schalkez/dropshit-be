import express from "express";
import { UserControllers } from "../../controllers/user.controller";

const router = express.Router();

router.get("/now", UserControllers.lotteryNow);

router.get("/history-result", UserControllers.historyLoteryResult);

export default router;
