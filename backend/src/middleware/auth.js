import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

// Ստուգում է JWT token-ը և գտնում օգտատիրոջը
export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Չթույլատրված' });
    }

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await AdminUser.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'Օգտատերը չկա' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Անվավեր token' });
  }
}

// Թույլատրում է միայն որոշակի դերերով օգտատերերին
export function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Չթույլատրված' });
    }

    // Leader-ը միշտ անցնում է
    if (req.user.role === 'leader') {
      return next();
    }

    // Ստուգում է, որ օգտատիրոջ դերը թույլատրվածների մեջ լինի
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Դուք իրավունք չունեք' });
    }

    next();
  };
}