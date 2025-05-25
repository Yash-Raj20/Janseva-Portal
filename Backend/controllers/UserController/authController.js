// 📦 Imports
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import Problem from "../../models/Problem.js";
import Notification from "../../models/Notification.js";
import validator from "validator";
import bcrypt from "bcryptjs";

// Helper: Generate JWT token
const generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    name: user.name,
    role: user.role || "user",
  };

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set in environment variables");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// 🧑‍💻 Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, location } = req.body;

    // Basic validation
    if (!name || !email || !password || !phone || !location) {
      return res
        .status(400)
        .json({ error: "Name, email, password, phone, and location are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      location,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err.message);
    res
      .status(500)
      .json({ error: "Registration failed. Please try again later." });
  }
};

// 🗝️ Login User with Cookie
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({
        user: { _id: user._id, email: user.email, name: user.name },
        message: "Login successful",
      });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Login failed. Please try again later." });
  }
};

// 🚪 Logout User
export const logoutUser = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};

// 👤 User: View own profile with problems & notifications
export const profile = async (req, res) => {
  try {
    const userId = req.user?._id || req.userId; // depends on your auth middleware

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No userId found" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const problems = await Problem.find({ user: userId }).sort({ createdAt: -1 });
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        createdAt: user.createdAt,
      },
      problems,
      notifications,
    });
  } catch (err) {
    console.error("Error in profile route:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};