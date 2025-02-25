import express, { Router } from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  // updateCart,
  //numberCart,
  //totalAmount,
} from "../controllers/cartController.js";

const router: Router = express.Router();

//router.get("/numberCart", numberCart);
//router.get("/totalAmount", totalAmount);

router.post("/add", addToCart);
//router.delete("/remove", removeFromCart);

router.get("/:userId", getCart);

export default router;
