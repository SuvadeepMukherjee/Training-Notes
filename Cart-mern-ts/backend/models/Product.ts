import mongoose, { Schema, Document, Model } from "mongoose";

// Interface defining the structure of an object
//The `IProduct` interface defines the structure of a product object in TypeScript.
//inherits all properties and methods from the `Document` interface.
interface IProduct extends Document {
  _id: number;
  productName: string;
  price: number;
  productImage: string;
  description: string;
  category: "laptop" | "mobile" | "tshirts" | "camera";
}

// Define the schema with TypeScript generics
// A generic in TypeScript allows us to create reusable, flexible, and type-safe components, functions, and classes
// // `Schema<IProduct>` uses a generic type to enforce that this schema follows the `IProduct` interface.
const ProductSchema = new Schema<IProduct>({
  _id: { type: Number, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  productImage: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["laptop", "mobile", "tshirts", "camera"], //Restricts category to specific string values
  },
});

// Creating a Mongoose model for the "Product" collection with TypeScript type safety
const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  ProductSchema
);
export { IProduct };
export default Product;
