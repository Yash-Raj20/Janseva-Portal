// 📦 Imports
import jwt from "jsonwebtoken";
import Admin from "../../models/Admin.js";
import User from "../../models/User.js";
import Problem from "../../models/Problem.js";
import validator from "validator";
import bcrypt from "bcryptjs";

// Helper: Generate JWT token including role info
const generateToken = (admin) => {
  const payload = {
    _id: admin._id,
    email: admin.email,
    name: admin.name,
    role: admin.role || "admin",
  };

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set in environment variables");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// 🧑‍💻 Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ error: "Registration failed. Please try again later." });
  }
};

// 🗝️ Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(admin);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({
        admin: { _id: admin._id, email: admin.email, name: admin.name },
        message: "Login successful",
      });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Login failed. Please try again later." });
  }
};

// 🚪 Logout Admin
export const logoutAdmin = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};

// 👤 Admin: View own profile (uses adminMiddleware to get req.admin)
export const adminProfile = async (req, res) => {
  try {
    const adminId = req.adminId || req.admin?._id;

    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized: No adminId found" });
    }

    const admin = await Admin.findById(adminId).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        createdAt: admin.createdAt,
      },
    });
  } catch (err) {
    console.error("Error in adminProfile route:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔍 Admin: View any user's profile & problems
export const getUserProfileByAdmin = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const problems = await Problem.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      problems,
    });
  } catch (err) {
    console.error("Error in getUserProfileByAdmin route:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};