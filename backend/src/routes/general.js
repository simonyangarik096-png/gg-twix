import express from 'express';
import { getGeneral, updateGeneral } from '../controllers/generalController.js';
import { protect, allowRoles } from '../middleware/auth.js';

const router = express.Router();

// GET /api/general — Ստանալ ընդհանուր կոնտենտը
// Հանրային — բոլորը կարող են տեսնել
router.get('/', getGeneral);

// PUT /api/general — Թարմացնել ընդհանուր կոնտենտը
// Պաշտպանված — միայն Ընդհանուր admin (կամ Leader)
router.put('/', protect, allowRoles('general'), updateGeneral);

export default router;