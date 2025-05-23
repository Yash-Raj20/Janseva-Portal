import express from 'express';
import Problem from '../models/Problem.js';
import {adminMiddleware, isAdmin } from '../middleware/adminMiddleware.js';
import { loginAdmin, logoutAdmin, registerAdmin } from "../controllers/AdminController/adminController.js";

const router = express.Router();

// Admin login and register routes
router.post("/adminlogin", loginAdmin);
router.post("/adminregister", registerAdmin);
router.post("/logout", adminMiddleware, logoutAdmin);
router.post("/profile", adminMiddleware, logoutAdmin);

// Get all problems, only accessible by an admin
router.get('/', adminMiddleware, isAdmin, async (req, res) => {
  try {
    const problems = await Problem.find().populate('adminId', 'name email');
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching problems", error: err.message });
  }
});

// Update problem status, only accessible by an admin
router.put('/update-status/:id', adminMiddleware, isAdmin, async (req, res) => {
  const { status } = req.body;
  try {
    const updatedProblem = await Problem.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedProblem) return res.status(404).json({ message: 'Problem not found' });
    res.json(updatedProblem);
  } catch (err) {
    res.status(500).json({ message: "Error updating status", error: err.message });
  }
});

export default router;
