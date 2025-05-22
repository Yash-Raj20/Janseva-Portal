import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
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
    const userId = decoded.id || decoded._id || decoded.userId;
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Invalid token payload: No user ID found." });
    }

    // Fetch user
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Attach to request object
    req.user = user;
    req.userId = user._id;

    next();
  } catch (err) {
    console.error("❌ JWT verification error:", err.message);
    return res.status(401).json({ error: "Token invalid or expired." });
  }
};

export default authMiddleware;
