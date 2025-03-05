// Load environment variables from a .env file
import "dotenv/config";
// Import Express framework
import express from "express";
// Import CORS middleware for handling cross-origin requests
import cors from "cors";
// Import path module for working with file paths
import path from "path";
// Import function to connect to the database
import connectDB from "./config/db.ts";
// Import function to handle file URLs
import { fileURLToPath } from "url";
// Import function to get the directory name
import { dirname } from "path";

// Import routers
import productRoutes from "./routes/productRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import cartRoutes from "./routes/cartRoutes.ts";

// Get the current file's full path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name of the current file
const __dirname = dirname(__filename);

const port = 5000;
const app = express();
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
// Serve static files from the "public/images" directory when accessed via "/images" URL path
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Set up API routes for different functionalities
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB();
});
