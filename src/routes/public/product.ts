import express from "express";
import { adminController } from "../../controllers/admin.controller";

const router = express.Router();

router.get("/wishlist", adminController.productsWishlist);
router.get("/wishlist-count", adminController.productsWishlistCount);
router.get("/", adminController.getProduct);
router.get("/:id", adminController.getProductById);
router.post("/wishlist/:id", adminController.addToWishlist);
router.delete("/wishlist/:id", adminController.removeFromWishlist);

export default router;
