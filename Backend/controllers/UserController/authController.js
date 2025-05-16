import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import Problem from "../../models/Problem.js";
import Notification from "../../models/Notification.js"; // ✅ Import added

// Register User
export const registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Registration failed", detail: err.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { user: { id: user._id, email: user.email } },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

// Get Profile Info
export const profile = async (req, res) => {
  try {
    const issues = await Problem.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      user: {
        name: req.user.name,
        email: req.user.email,
        createdAt: req.user.createdAt,
      },
      issues,
      notifications,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};