import Cart from "../models/Cart.ts";
import Product from "../models/Product.ts";
import mongoose from "mongoose";
import { IProduct } from "../models/Product.js";
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

const totalAmount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      res
        .status(400)
        .json({ message: "User ID is required and must be a string" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart) {
      res.json({ totalAmount: 0 });
    }

    let totalAmount = 0;
    for (const item of cart!.items) {
      const product = item.product as IProduct; // Explicitly cast item.product as IProduct

      if (product && typeof product === "object" && "price" in product) {
        totalAmount += product.price * item.quantity;
      }
    }

    res.json({ totalAmount });
  } catch (error) {
    console.error("Error fetching total cart amount:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const numberCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      res
        .status(400)
        .json({ message: "User ID is required and must be a string" });
      return;
    }

    const cart = await Cart.findOne({ userId });

    if (!cart || !cart.items.length) {
      res.status(200).json({ totalItems: 0 });
      return;
    }

    const totalItems = cart.items.reduce(
      (acc: number, item: { quantity: number }) => acc + item.quantity,
      0
    );

    res.status(200).json({ totalItems });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const removeFromCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId } = req.body;

    // Validate required fields
    if (!userId || !productId) {
      res.status(400).json({ error: "Missing userId or productId" });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    // If cart does not exist, return an error
    if (!cart) {
      res.status(404).json({ error: "Cart not found" });
    }

    // Find the index of the product in the cart
    const existingItemIndex = cart!.items.findIndex(
      (item) => String(item.product) === String(productId)
    );

    // If the product is not in the cart, return an error
    if (existingItemIndex === -1) {
      res.status(404).json({ error: "Item not in cart" });
    }

    // Check if the item's quantity is more than 1, then decrement quantity
    if (cart!.items[existingItemIndex].quantity > 1) {
      cart!.items[existingItemIndex].quantity -= 1;
    } else {
      cart!.items.splice(existingItemIndex, 1);
    }

    // If cart is empty, delete it
    if (cart!.items.length === 0) {
      await Cart.deleteOne({ userId });
      res.status(200).json({ message: "Cart is now empty", cart: null });
    }

    await cart!.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export { getCart, addToCart, totalAmount, numberCart, removeFromCart };
