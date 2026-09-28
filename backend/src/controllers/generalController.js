import GeneralContent from '../models/GeneralContent.js';

// Ստանալ ընդհանուր կոնտենտը (հանրային)
export async function getGeneral(req, res) {
  try {
    let content = await GeneralContent.findOne();
    if (!content) {
      content = await GeneralContent.create({
        navbarLinks: [
          { label: 'Գլխավոր', href: '/' },
          { label: 'Տեսանյութեր', href: '/#videos' },
          { label: 'Խաղ', href: '/game' },
          { label: 'Կապ', href: '/#contact' }
        ]
      });
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Թարմացնել ընդհանուր կոնտենտը (միայն Ընդհանուր admin)
export async function updateGeneral(req, res) {
  try {
    let content = await GeneralContent.findOne();
    if (!content) {
      content = new GeneralContent();
    }

    if (req.body.heroTitle !== undefined) content.heroTitle = req.body.heroTitle;
    if (req.body.heroSubtitle !== undefined) content.heroSubtitle = req.body.heroSubtitle;

    if (req.body.tvSection !== undefined) {
      content.tvSection = {
        ...content.tvSection,
        ...req.body.tvSection
      };
    }

    if (req.body.gameSection !== undefined) {
      content.gameSection = {
        ...content.gameSection,
        ...req.body.gameSection
      };
    }

    if (req.body.navbarLinks !== undefined) content.navbarLinks = req.body.navbarLinks;
    if (req.body.footerText !== undefined) content.footerText = req.body.footerText;

    if (req.body.socials !== undefined) {
      content.socials = {
        ...content.socials,
        ...req.body.socials
      };
    }

    content.updatedBy = req.user._id;

    await content.save();

    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}