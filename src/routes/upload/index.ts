import express from "express";
import { UploadController } from "../../controllers/upload.controller";
import { adminController } from "../../controllers/admin.controller";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/file", upload.single("file"), UploadController.upload);

router.post("/add-bank", adminController.addbankInfo);
export default router;
