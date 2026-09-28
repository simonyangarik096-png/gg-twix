import express from 'express';
import {
  listAdmins,
  createAdmin,
  updateAdmin,
  changePassword,
  deleteAdmin,
  getLogs
} from '../controllers/adminController.js';
import { protect, allowRoles } from '../middleware/auth.js';

const router = express.Router();

// Բոլոր route-ները այստեղ պահանջում են.
// 1. Մուտք գործած լինել (protect)
// 2. Ունենալ leader դեր (allowRoles('leader'))
router.use(protect);
router.use(allowRoles('leader'));

// GET /api/admin/users — Բոլոր ադմինների ցանկ
router.get('/users', listAdmins);

// POST /api/admin/users — Ստեղծել նոր ադմին
router.post('/users', createAdmin);

// PUT /api/admin/users/:id — Խմբագրել ադմին (username, email, role)
router.put('/users/:id', updateAdmin);

// PUT /api/admin/users/:id/password — Փոխել ադմինի password
router.put('/users/:id/password', changePassword);

// DELETE /api/admin/users/:id — Ջնջել ադմին
router.delete('/users/:id', deleteAdmin);

// GET /api/admin/logs — Ստանալ activity log-ը
router.get('/logs', getLogs);

export default router;