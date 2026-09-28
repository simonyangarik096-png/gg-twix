import EvaContent from '../models/EvaContent.js';

// Ստանալ Eva-ի կոնտենտը (հանրային)
export async function getEva(req, res) {
  try {
    let content = await EvaContent.findOne();
    if (!content) {
      content = await EvaContent.create({});
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Թարմացնել Eva-ի կոնտենտը (միայն Eva admin)
export async function updateEva(req, res) {
  try {
    let content = await EvaContent.findOne();
    if (!content) {
      content = new EvaContent();
    }

    // Թարմացնել միայն թույլատրված դաշտերը
    if (req.body.bio !== undefined) content.bio = req.body.bio;
    if (req.body.images !== undefined) content.images = req.body.images;
    if (req.body.videos !== undefined) content.videos = req.body.videos;

    content.updatedBy = req.user._id;

    await content.save();

    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}