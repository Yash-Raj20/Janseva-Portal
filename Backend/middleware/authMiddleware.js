import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token || typeof token !== "string" || token === "null" || token.trim() === "") {
      return res.status(401).json({ error: "Access denied. No token provided in cookies." });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not configured in environment");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(`User Middleware: ${req.method} ${req.originalUrl}`);

    // Check role from token payload (assuming token has a 'role' field)
    if (decoded.role !== "user") {
      return res.status(403).json({ error: "Access denied: User is not an admin." });
    }


    const userId = decoded.id || decoded._id || decoded.userId;
    if (!userId) {
      return res.status(401).json({ error: "Invalid token payload: No user ID found." });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    req.user = user;
    req.userId = user._id;

    next();
  } catch (err) {
    console.error("❌ JWT verification error:", err.message);
    return res.status(401).json({ error: "Token invalid or expired." });
  }
};

export default authMiddleware;