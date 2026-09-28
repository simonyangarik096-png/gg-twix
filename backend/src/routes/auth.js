import express from 'express';
import { login, me, logout } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/login — Մուտք
// Հանրային — ոչ ոք չի պահանջվում
router.post('/login', login);

// GET /api/auth/me — Ընթացիկ օգտատեր
// Պաշտպանված — պահանջում է JWT token
router.get('/me', protect, me);

// POST /api/auth/logout — Ելք
// Պաշտպանված — գրանցում է log-ում
router.post('/logout', protect, logout);

export default router;