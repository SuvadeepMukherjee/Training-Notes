import { Request, Response } from "express";
import Product from "../models/Product.ts";

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
): Promise<void> => {};
export { getProducts, getProductQuantityInCart };
