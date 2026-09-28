import express from 'express';
import { getEva, updateEva } from '../controllers/evaController.js';
import { protect, allowRoles } from '../middleware/auth.js';

const router = express.Router();

// GET /api/eva — Ստանալ Eva-ի կոնտենտը
// Հանրային — բոլորը կարող են տեսնել
router.get('/', getEva);

// PUT /api/eva — Թարմացնել Eva-ի կոնտենտը
// Պաշտպանված — միայն Eva admin (կամ Leader)
router.put('/', protect, allowRoles('eva'), updateEva);

export default router;