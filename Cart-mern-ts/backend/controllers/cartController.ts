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
interface AddToCartRequest extends Request {
  body: {
    userId: string;
    productId: string;
    quantity: number;
  };
}

const addToCart = async (
  req: AddToCartRequest,
  res: Response
): Promise<void> => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      res.status(400).json({ message: "Invalid request parameters" });
      return;
    }

    // Check if the product exists in the database
    const product = await Product.findById(productId);
    if (!product) {
      res.status(400).json({ message: "Product not found" });
      return;
    }

    // Find the cart associated with the user
    let cart = await Cart.findOne({ userId });

    // If the user does not have a cart, create a new one
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    cart.items = cart.items || [];

    // Check if the product already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => String(item.product) === String(productId)
    );

    if (existingItemIndex !== -1) {
      // If product exists in cart, update the quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If product is not in the cart, add a new item
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export { getCart, addToCart };
