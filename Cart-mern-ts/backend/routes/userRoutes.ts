import express, { Router } from "express";
import { getUser } from "../controllers/userController.ts";

const router: Router = express.Router();

router.get("/profile/:userId", getUser);

export default router;
