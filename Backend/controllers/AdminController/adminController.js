import jwt from "jsonwebtoken";
import Admin from "../../models/Admin.js";
import User from "../../models/User.js";
import Problem from "../../models/Problem.js";

import validator from "validator";

// Helper: Generate JWT token
const generateToken = (admin) => {
  const payload = {
    _id: admin._id,
    email: admin.email,
    name: admin.name,
  };

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set in environment variables");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const admin = new Admin({ name, email, password });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error("Registration error:", err.message);
    res
      .status(500)
      .json({ error: "Registration failed. Please try again later." });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(admin);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({
        user: { _id: admin._id, email, name: admin.name },
        message: "Login successful",
      });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Login failed. Please try again later." });
  }
};

// Logout (Clear cookie)
export const logoutAdmin = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};

export const profile = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const problems = await Problem.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      problems,
    });
  } catch (error) {
    console.error("Error in profile route:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
