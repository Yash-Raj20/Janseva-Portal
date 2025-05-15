import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

 export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add the decoded token (user info) to the request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
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
