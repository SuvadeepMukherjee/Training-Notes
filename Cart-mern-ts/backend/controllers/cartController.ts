import Cart from "../models/Cart.js";
import Product from "../models/Product.ts";
import mongoose from "mongoose";
import { Request, Response } from "express";

const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      res.status(400).json({ message: "Invalid userId" });
      return;
    }

    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      res.status(200).json({ items: [] });
      return;
    }

    const formattedCart = {
      userId: cart.userId,
      items: cart.items
        .filter((item) => item.product)
        .map((item) => ({
          productId: (item.product as any)._id,
          productName: (item.product as any).name || "Product",
          price: (item.product as any).price || 0,
          productImage: (item.product as any).image || "",
          quantity: item.quantity,
        })),
    };

    res.status(200).json(formattedCart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export { getCart };
