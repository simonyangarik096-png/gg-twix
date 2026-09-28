import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import { seedInitialData } from './utils/seed.js';

import authRoutes from './routes/auth.js';
import yanaRoutes from './routes/yana.js';
import evaRoutes from './routes/eva.js';
import generalRoutes from './routes/general.js';
import adminRoutes from './routes/admin.js';
import uploadRoutes from './routes/upload.js';
import youtubeRoutes from './routes/youtube.js';

// .env ֆայլի փոփոխականները բեռնել
dotenv.config();

// __dirname-ի ստացում ES modules-ում
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ============ MIDDLEWARE ============
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static ֆայլերի սպասարկում (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ============ ROUTES ============
app.use('/api/auth', authRoutes);
app.use('/api/yana', yanaRoutes);
app.use('/api/eva', evaRoutes);
app.use('/api/general', generalRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/youtube', youtubeRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    message: 'GG TWIX backend is running',
    timestamp: new Date().toISOString()
  });
});

// ============ START ============
await connectDB();
await seedInitialData();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('');
  console.log('🚀 ================================');
  console.log(`🚀 GG TWIX Backend started`);
  console.log(`🚀 ================================`);
  console.log(`🌐 URL:   http://localhost:${PORT}`);
  console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
  console.log(`📁 Uploads: http://localhost:${PORT}/uploads`);
  console.log(`📺 YouTube: http://localhost:${PORT}/api/youtube/subscribers`);
  console.log('');
});