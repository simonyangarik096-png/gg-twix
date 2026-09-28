import AdminUser from '../models/AdminUser.js';
import ActivityLog from '../models/ActivityLog.js';

// Ստանալ բոլոր ադմինները (միայն Leader)
export async function listAdmins(req, res) {
  const users = await AdminUser.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
}

// Ստեղծել ադմին (միայն Leader)
export async function createAdmin(req, res) {
  try {
    const { username, password, email, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).json({ error: 'Լրացրու բոլոր դաշտերը' });
    }
    if (!['yana', 'eva', 'general', 'leader'].includes(role)) {
      return res.status(400).json({ error: 'Անվավեր դեր' });
    }
    const exists = await AdminUser.findOne({ username });
    if (exists) return res.status(400).json({ error: 'Այդ անունը զբաղված է' });

    const user = await AdminUser.create({
      username, password, email, role, createdBy: req.user._id
    });

    await ActivityLog.create({
      userId: req.user._id,
      username: req.user.username,
      action: 'create',
      target: 'user',
      details: `Ստեղծեց ${role} ադմին՝ ${username}`
    });

    res.status(201).json({
      id: user._id,
      username: user.username,
      role: user.role,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Խմբագրել ադմին (միայն Leader)
export async function updateAdmin(req, res) {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;
    const user = await AdminUser.findById(id);
    if (!user) return res.status(404).json({ error: 'Չգտնվեց' });

    if (username) user.username = username;
    if (email !== undefined) user.email = email;
    if (role) user.role = role;
    await user.save();

    await ActivityLog.create({
      userId: req.user._id,
      username: req.user.username,
      action: 'update',
      target: 'user',
      details: `Խմբագրեց ադմին՝ ${user.username}`
    });

    res.json({
      id: user._id,
      username: user.username,
      role: user.role,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Փոխել password (միայն Leader)
export async function changePassword(req, res) {
  try {
    const { id } = req.params;
    const { password } = req.body;
    if (!password || password.length < 4) {
      return res.status(400).json({ error: 'Գաղտնաբառը 4+ նշան' });
    }
    const user = await AdminUser.findById(id);
    if (!user) return res.status(404).json({ error: 'Չգտնվեց' });

    user.password = password;
    await user.save();

    await ActivityLog.create({
      userId: req.user._id,
      username: req.user.username,
      action: 'update',
      target: 'password',
      details: `Փոխեց password-ը՝ ${user.username}`
    });

    res.json({ ok: true, message: 'Password փոխված է' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Ջնջել ադմին (միայն Leader)
export async function deleteAdmin(req, res) {
  try {
    const { id } = req.params;
    if (id === req.user._id.toString()) {
      return res.status(400).json({ error: 'Չես կարող ջնջել ինքդ քեզ' });
    }
    const user = await AdminUser.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ error: 'Չգտնվեց' });

    await ActivityLog.create({
      userId: req.user._id,
      username: req.user.username,
      action: 'delete',
      target: 'user',
      details: `Ջնջեց ադմին՝ ${user.username}`
    });

    res.json({ ok: true, message: 'Ջնջված է' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Ստանալ Activity Log-ը (միայն Leader)
export async function getLogs(req, res) {
  const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(200);
  res.json(logs);
}