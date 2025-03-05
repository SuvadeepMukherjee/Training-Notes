// Import Express framework and Router module
import express, { Router } from "express";
import { getUser } from "../controllers/userController.ts";

// Creating an Express Router instance
const router: Router = express.Router();

router.get("/profile/:userId", getUser);

export default router;
