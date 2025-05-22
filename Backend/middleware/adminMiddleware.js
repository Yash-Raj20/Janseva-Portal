import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token || token === "null" || token.trim() === "") {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided in cookies." });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract user ID safely
    const adminId = decoded.id || decoded._id || decoded.userId;
    if (!adminId) {
      return res
        .status(401)
        .json({ error: "Invalid token payload: No user ID found." });
    }

    // Fetch user
    const admin = await Admin.findById(userId).select("-password");
    if (!admin) {
      return res.status(404).json({ error: "User not found." });
    }

    // Attach to request object
    req.admin = admin;
    req.adminId = admin._id;

    next();
  } catch (err) {
    console.error("❌ JWT verification error:", err.message);
    return res.status(401).json({ error: "Token invalid or expired." });
  }
};

// Middleware to check if the user is an admin
export const isAdmin = async (req, res, next) => {
  try {
    // Assuming protect middleware already adds req.user
    const admin = await Admin.findById(req.user._id);
    if (!admin) return res.status(403).json({ message: 'Access denied: Not an admin' });
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

