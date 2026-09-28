// Նկարի վերբեռնում
export async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Ֆայլ չկա' });
    }

    res.json({
      url: `/uploads/images/${req.file.filename}`,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Վիդեոյի վերբեռնում
export async function uploadVideo(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Ֆայլ չկա' });
    }

    res.json({
      url: `/uploads/videos/${req.file.filename}`,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 