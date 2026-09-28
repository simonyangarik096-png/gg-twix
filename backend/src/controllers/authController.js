import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';
import ActivityLog from '../models/ActivityLog.js';

// Ստեղծել JWT token օգտատիրոջ համար
function signToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
}

// Մուտք (Login)
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Լրացրու բոլոր դաշտերը' });
    }

    const user = await AdminUser.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Սխալ տվյալներ' });
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
      return res.status(401).json({ error: 'Սխալ տվյալներ' });
    }

    // Գրանցել login-ը ActivityLog-ում
    await ActivityLog.create({
      userId: user._id,
      username: user.username,
      action: 'login',
      target: 'auth',
      details: 'Մուտք գործեց համակարգ'
    });

    const token = signToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Ստանալ ընթացիկ օգտատիրոջը
export async function me(req, res) {
  res.json({
    id: req.user._id,
    username: req.user.username,
    role: req.user.role
  });
}

// Ելք (Logout) — client-ը պարզապես ջնջում է token-ը
export async function logout(req, res) {
  try {
    if (req.user) {
      await ActivityLog.create({
        userId: req.user._id,
        username: req.user.username,
        action: 'logout',
        target: 'auth',
        details: 'Դուրս եկավ համակարգից'
      });
    }
    res.json({ ok: true, message: 'Դուրս եկար' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}