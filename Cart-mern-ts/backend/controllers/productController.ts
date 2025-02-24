import { Request, Response } from "express";
import Product from "../models/Product.ts";
import Cart from "../models/Cart.js";
import { ICart } from "../models/Cart.js";

// Controller to fetch products based on category
const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    let query: Record<string, unknown> = {}; // Type-safe query object

    if (category && category !== "all" && typeof category === "string") {
      query.category = category;
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const getProductQuantityInCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      res
        .status(400)
        .json({ message: "userId is required and must be a string" });
      return;
    }

    const cart: ICart | null = await Cart.findOne({ userId }).populate(
      "items.product"
    );

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    const cartItems = cart.items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));

    res.json({ userId, cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export { getProducts, getProductQuantityInCart };
