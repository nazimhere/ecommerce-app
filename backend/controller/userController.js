import bcrypt from "bcryptjs";
import validator from "validator";
import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}
// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter valid email" });
        }
        // Find user and verify password
        const user = await userModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }
        // Validate email and password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be 8+ characters" });
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find admin user (assumes role field exists)
        const admin = await userModel.findOne({ email, role: 'admin' });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.json({ success: false, message: "Invalid admin credentials" });
        }
        const token = createToken(admin._id);
        res.json({ success: true, token, role: admin.role });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.json({ success: true, message: "Admin created", id: admin._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { loginUser, registerUser, adminLogin,createAdmin };
