import mongoose from "mongoose";
import Product from "./models/Product.ts";
import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(
  MONGO_URI as string,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions
);

const products = [
  {
    _id: 1,
    productName: "IPhone",
    price: 999.0,
    productImage: "http://localhost:5000/images/1.png",
    description: "High-end smartphone",
    category: "mobile",
  },
  {
    _id: 2,
    productName: "Macbook Pro 2022 (M1)",
    price: 1999.0,
    productImage: "http://localhost:5000/images/2.png",
    description: "Latest Apple laptop",
    category: "laptop",
  },
  {
    _id: 3,
    productName: "Cannon M50 Camera",
    price: 699.0,
    productImage: "http://localhost:5000/images/3.png",
    description: "Compact DSLR camera",
    category: "camera",
  },
  {
    _id: 4,
    productName: "WLS Van Gogh Denim Jacket",
    price: 228.0,
    productImage: "http://localhost:5000/images/4.png",
    description: "Trendy denim jacket",
    category: "tshirts",
  },
];

const insertProducts = async () => {
  try {
    await Product.insertMany(products);
    console.log("Products added successfully!");
  } catch (err) {
    console.error("Error inserting products:", err);
  } finally {
    mongoose.connection.close();
  }
};

insertProducts();
