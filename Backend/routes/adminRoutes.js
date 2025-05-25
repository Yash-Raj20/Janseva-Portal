import express from "express";
import Problem from "../models/Problem.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import {
  adminProfile,
  getUserProfileByAdmin,
  loginAdmin,
  logoutAdmin,
  registerAdmin,
} from "../controllers/AdminController/adminController.js";

const router = express.Router();

// ========== Admin Auth Routes ==========
router.post("/adminlogin", loginAdmin);
router.post("/adminregister", registerAdmin);
router.post("/logout", adminMiddleware, logoutAdmin);
router.get("/profile", adminMiddleware, adminProfile);
router.get("/admin/users/:userId/profile", adminMiddleware, getUserProfileByAdmin);

export default router;
