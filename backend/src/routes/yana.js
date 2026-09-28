import express from 'express';
import { getYana, updateYana } from '../controllers/yanaController.js';
import { protect, allowRoles } from '../middleware/auth.js';

const router = express.Router();

// GET /api/yana — Ստանալ Yana-ի կոնտենտը
// Հանրային — բոլորը կարող են տեսնել
router.get('/', getYana);

// PUT /api/yana — Թարմացնել Yana-ի կոնտենտը
// Պաշտպանված — միայն Yana admin (կամ Leader)
router.put('/', protect, allowRoles('yana'), updateYana);

export default router;