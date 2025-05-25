import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  profile,
  logoutUser,
} from "../controllers/UserController/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/profile", authMiddleware, profile);

export default router;