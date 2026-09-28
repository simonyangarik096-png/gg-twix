import mongoose from 'mongoose';

const generalContentSchema = new mongoose.Schema({
  heroTitle: {
    type: String,
    default: 'GG TWIX'
  },
  heroSubtitle: {
    type: String,
    default: 'Երկու քույր, մեկ ալիք'
  },
  tvSection: {
    title: {
      type: String,
      default: 'Հեռուստացույց'
    },
    text: {
      type: String,
      default: ''
    }
  },
  gameSection: {
    title: {
      type: String,
      default: 'Խաղային ապարատ'
    },
    text: {
      type: String,
      default: ''
    }
  },
  navbarLinks: [{
    label: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    }
  }],
  footerText: {
    type: String,
    default: '© GG TWIX'
  },
  socials: {
    youtube: {
      type: String,
      default: ''
    },
    instagram: {
      type: String,
      default: ''
    },
    tiktok: {
      type: String,
      default: ''
    }
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser'
  }
}, {
  timestamps: true
});

export default mongoose.model('GeneralContent', generalContentSchema);