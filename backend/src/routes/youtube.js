import express from 'express';
import { getSubscriberCount } from '../controllers/youtubeController.js';

const router = express.Router();

// GET /api/youtube/subscribers — Հանրային
router.get('/subscribers', getSubscriberCount);

export default router;