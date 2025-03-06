import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.ts";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions
    );
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

const seedUsers = async (): Promise<void> => {
  try {
    const userIds: string[] = [
      "65c96f8a1a2b4c001f3d8e9a", // Existing user
      "a24b23c5d3f4g78h90i1j2k3",
      "b34f23e4d5g6h89i12j3k4l5",
      "c45g67h8j9k0l1m2n3o4p5q6",
      "d56h78j9k0l2m3n4o5p6q7r8",
      "e67i89j0k1l2m3n4o5p6q7s9",
    ];

    for (const userId of userIds) {
      const existingUser = await User.findOne({ userId }).exec();

      if (existingUser) {
        console.log(`User with ID ${userId} already exists!`);
      } else {
        const newUser = new User({ userId });
        await newUser.save();
        console.log(`Dummy user with ID ${userId} added to the database.`);
      }
    }
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await mongoose.connection.close();
  }
};

const run = async (): Promise<void> => {
  await connectDB();
  await seedUsers();
};

run();
