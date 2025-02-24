import "dotenv/config"; // Load environment variables
import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.ts";
import { fileURLToPath } from "url";
import { dirname } from "path";
import productRoutes from "./routes/productRoutes.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the "public/images" directory when accessed via "/images" URL path
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB();
});
