import "dotenv/config"; // Load environment variables
import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import connectDB from "./config/db.ts";

const port = 5000;
const app = express();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB();
});
