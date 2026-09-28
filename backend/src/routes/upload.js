import express from 'express';
import multer from 'multer';
import path from 'path';
import { protect } from '../middleware/auth.js';
import { uploadImage, uploadVideo } from '../controllers/uploadController.js';

const router = express.Router();

// Multer-ի կարգավորում — որտեղ պահել ֆայլերը և ինչպես անվանել
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, 'uploads/videos');
    } else {
      cb(null, 'uploads/images');
    }
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

// Multer instance — ֆայլի չափի սահմանափակում
const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 } // 500MB
});

// POST /api/upload/image — Նկար վերբեռնել
router.post('/image', protect, upload.single('file'), uploadImage);

// POST /api/upload/video — Վիդեո վերբեռնել
router.post('/video', protect, upload.single('file'), uploadVideo);

export default router;