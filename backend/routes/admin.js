// routes/admin.js or server.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

app.post('/api/user/admin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Admin credentials from .env (secure)
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@test.com';
    const ADMIN_PASSWORD = await bcrypt.compare(password, process.env.ADMIN_HASH || '$2a$10$...'); // Hashed
    
    if (email === ADMIN_EMAIL && ADMIN_PASSWORD) {
      const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid admin credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
