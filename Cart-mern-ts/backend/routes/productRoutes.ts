import express, { Router } from "express";
import {
  getProducts,
  getProductQuantityInCart,
} from "../controllers/productController.ts";

const router: Router = express.Router();

router.get("/products-in-cart", getProductQuantityInCart);
router.get("/", getProducts);

export default router;
