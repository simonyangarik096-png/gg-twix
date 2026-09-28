import YanaContent from '../models/YanaContent.js';

// Ստանալ Yana-ի կոնտենտը (հանրային)
export async function getYana(req, res) {
  try {
    let content = await YanaContent.findOne();
    if (!content) {
      content = await YanaContent.create({});
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Թարմացնել Yana-ի կոնտենտը (միայն Yana admin)
export async function updateYana(req, res) {
  try {
    let content = await YanaContent.findOne();
    if (!content) {
      content = new YanaContent();
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