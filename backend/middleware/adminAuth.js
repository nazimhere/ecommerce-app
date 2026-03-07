import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    // ✅ Read token directly from headers (matches frontend { headers: { token } })
    const token = req.headers.token

    if (!token) {
      return res.json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not authorized" });
    }

    next();
  } catch (error) {
    res.json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth;