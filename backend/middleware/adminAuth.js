import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.json({ success: false, message: "No token provided" });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // ✅ Check against env variable instead of role
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not authorized" });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth;