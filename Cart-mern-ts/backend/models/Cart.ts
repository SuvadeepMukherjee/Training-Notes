import mongoose, { Schema, Document, Model } from "mongoose";
import { IProduct } from "./Product.ts"; // Now this will work

// Define Cart Item Interface
interface ICartItem {
  product: string | IProduct; // Product reference as ObjectId or populated object
  quantity: number;
}

// Define Cart Interface
export interface ICart extends Document {
  userId: string;
  items: ICartItem[];
}

// Define Schema
const CartSchema: Schema<ICart> = new Schema({
  userId: { type: String, required: true },
  items: [
    {
      product: { type: String, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
});

// Create Model
const Cart: Model<ICart> = mongoose.model<ICart>("Cart", CartSchema);

export default Cart;
