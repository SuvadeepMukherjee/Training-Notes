import Cart from "../models/Cart.ts";
import Product from "../models/Product.ts";
import mongoose from "mongoose";
// Importing TypeScript types from Express:
// - `Request`: Represents the HTTP request object (req).
// - `Response`: Represents the HTTP response object (res).
// These help with type safety when defining route handlers.
import { Request, Response, RequestHandler } from "express";

const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    //Extracts userId from request parameters
    const { userId } = req.params;

    //Validation to ensure userId is a string
    if (!userId || typeof userId !== "string") {
      res.status(400).json({ message: "Invalid userId" });
      return;
    }

    //Fetches the cart for the given userId, populating the product field inside items
    const cart = await Cart.findOne({ userId }).populate("items.product");

    //If no cart is found or it's empty , return an empty items array
    if (!cart || cart.items.length === 0) {
      res.status(200).json({ items: [] });
      return;
    }

    //Formats the cart data for response
    const formattedCart = {
      //userId taken from cart document
      userId: cart.userId,
      items: cart.items
        //Filters out items without a valid product
        .filter((item) => item.product)
        .map((item) => ({
          // TypeScript doesn't infer the type of `item.product`, so it's cast as `any` to avoid errors
          productId: (item.product as any)._id,
          productName: (item.product as any).name || "Product",
          price: (item.product as any).price || 0,
          productImage: (item.product as any).image || "",
          // Directly accessed since it's part of `cart.items`
          quantity: item.quantity,
        })),
    };
    //Sends the formatted cart as a JSON response
    res.status(200).json(formattedCart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

//An interface in TypeScript is a way to define the shape of an object
// Defining a custom interface that extends Express's `Request` type
interface AddToCartRequest extends Request {
  body: {
    // Ensures `userId` is always a string
    userId: string;
    // Ensures `productId` is always a string
    productId: string;
    // Ensures `quantity` is always a number
    quantity: number;
  };
}

const addToCart = async (
  req: AddToCartRequest, // Using the custom interface for strong typing

  res: Response // `Response` from Express, ensuring proper response typing
): Promise<void> => {
  // Return type `Promise<void>` indicates an async function that does not explicitly return a value.
  try {
    // Destructuring request body with strong type guarantees
    const { userId, productId, quantity } = req.body;

    // TypeScript ensures that `userId` and `productId` are strings and `quantity` is a number
    if (!userId || !productId || quantity <= 0) {
      res.status(400).json({ message: "Invalid request parameters" });
      return; // Ensures early function exit on validation failure
    }

    // Fetch product from  database
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

    // Ensures `items` is always an array
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
    console.log("response send", cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export { getCart, addToCart };
