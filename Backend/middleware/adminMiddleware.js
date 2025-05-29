import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.adminToken;

    if (!token || token === "null" || token.trim() === "") {
      return res.status(401).json({ error: "Access denied. No token provided in cookies." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Access denied: User is not an admin." });
    }

    const adminId = decoded.id || decoded._id || decoded.adminId;
    if (!adminId) {
      return res.status(401).json({ error: "Invalid token: No Admin ID found." });
    }

    const admin = await Admin.findById(adminId).select("-password");
    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }

    req.admin = admin;
    req.adminId = admin._id;

    next();
  } catch (err) {
    console.error("❌ Admin JWT verification error:", err.message);
    return res.status(401).json({ error: "Token invalid or expired." });
  }
};

export default adminMiddleware;