import { Request, Response } from "express";
import User from "../models/User.ts";

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.userId;

    const user = await User.findOne({ userId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ userId: user.userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { getUser };
