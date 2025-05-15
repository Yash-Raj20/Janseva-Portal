import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Admin from "../models/Admin.js";

// Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).json({ msg: "Admin registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Registration failed", error: error.message });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ msg: "Admin not found" });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { user: { id: admin._id, email: admin.email } },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Login failed", error: error.message });
  }
};