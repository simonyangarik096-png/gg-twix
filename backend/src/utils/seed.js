import AdminUser from '../models/AdminUser.js';
import GeneralContent from '../models/GeneralContent.js';
import YanaContent from '../models/YanaContent.js';
import EvaContent from '../models/EvaContent.js';

export async function seedInitialData() {
  try {
    // 1. Առաջին Leader-ի ստեղծում (եթե դեռ չկա)
    const leaderExists = await AdminUser.findOne({ role: 'leader' });
    if (!leaderExists) {
      await AdminUser.create({
        username: 'leader',
        password: 'leader123',
        role: 'leader',
        email: 'leader@ggtwix.am'
      });
      console.log('👑 Leader created: leader / leader123');
    }

    // 2. Ընդհանուր կոնտենտի ստեղծում (եթե դատարկ է)
    const generalCount = await GeneralContent.countDocuments();
    if (generalCount === 0) {
      await GeneralContent.create({
        heroTitle: 'GG TWIX',
        heroSubtitle: 'Երկու քույր, մեկ ալիք',
        tvSection: {
          title: 'Հեռուստացույց',
          text: 'Դիտիր մեր տեսանյութերը մեծ էկրանով։ Սեղմիր հեռուստացույցին՝ մեր ալիքը բացելու համար։'
        },
        gameSection: {
          title: 'Խաղային ապարատ',
          text: 'Փորձիր մեր խաղային ապարատը։ Շուտով կլինի խաղ։'
        },
        navbarLinks: [
          { label: 'Գլխավոր', href: '/' },
          { label: 'Տեսանյութեր', href: '/#videos' },
          { label: 'Խաղ', href: '/game' },
          { label: 'Կապ', href: '/#contact' }
        ],
        footerText: '© GG TWIX',
        socials: {
          youtube: 'https://youtube.com/@evayanagrigoryans',
          instagram: '',
          tiktok: ''
        }
      });
      console.log('📄 General content created');
    }

    // 3. Yana-ի կոնտենտի ստեղծում (եթե դատարկ է)
    const yanaCount = await YanaContent.countDocuments();
    if (yanaCount === 0) {
      await YanaContent.create({
        bio: 'Բարև ձեզ, ես Yana-ն եմ 🩷',
        images: [],
        videos: []
      });
      console.log('🩷 Yana content created');
    }

    // 4. Eva-ի կոնտենտի ստեղծում (եթե դատարկ է)
    const evaCount = await EvaContent.countDocuments();
    if (evaCount === 0) {
      await EvaContent.create({
        bio: 'Բարև ձեզ, ես Eva-ն եմ 💠',
        images: [],
        videos: []
      });
      console.log('💠 Eva content created');
    }

    console.log('✅ Seed ավարտված է');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  }
}