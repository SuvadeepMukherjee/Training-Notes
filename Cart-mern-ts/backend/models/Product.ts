import mongoose, { Schema, Document, Model } from "mongoose";

// Interface defining the shape of a product document
interface IProduct extends Document {
  _id: number;
  productName: string;
  price: number;
  productImage: string;
  description: string;
  category: "laptop" | "mobile" | "tshirts" | "camera"; // Enum type
}

// Define the schema with TypeScript generics
const ProductSchema = new Schema<IProduct>({
  _id: { type: Number, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  productImage: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["laptop", "mobile", "tshirts", "camera"], // Enum validation
  },
});

// Create and export the model with generics for type safety
const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  ProductSchema
);
export default Product;
