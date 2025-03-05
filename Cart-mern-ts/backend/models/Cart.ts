import mongoose, { Schema, Document, Model } from "mongoose";
import { IProduct } from "./Product.ts"; // Now this will work

// Interface defining the structure of an object
//The `ICart` interface defines the structure of a ICartIten object in TypeScript.
interface ICartItem {
  product: string | IProduct; // Product reference
  quantity: number;
}

// Interface defining the structure of an object
//The `ICart` interface defines the structure of a cart object in TypeScript.
//inherits all properties and methods from the `Document` interface.
export interface ICart extends Document {
  userId: string;
  items: ICartItem[];
}

// Define the schema with TypeScript generics
// A generic in TypeScript allows us to create reusable, flexible, and type-safe components, functions, and classes
// // `Schema<ICart>` uses a generic type to enforce that this schema follows the `ICart` interface.
const CartSchema: Schema<ICart> = new Schema({
  userId: { type: String, required: true },
  items: [
    {
      product: { type: String, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
});

// Creating a Mongoose model for the "Cart" collection with TypeScript type safety
const Cart: Model<ICart> = mongoose.model<ICart>("Cart", CartSchema);

export default Cart;
