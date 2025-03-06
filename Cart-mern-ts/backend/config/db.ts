import mongoose from "mongoose";
//Imports environment variables from a .env file
import "dotenv/config";

//returns a Promise with no resolved value (void)
const connectDB = async (): Promise<void> => {
  try {
    // as string tells TypeScript to treat it as a string (type assertion)
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;
