import mongoose from 'mongoose';

const evaContentSchema = new mongoose.Schema({
  bio: {
    type: String,
    default: ''
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  videos: [{
    type: {
      type: String,
      enum: ['url', 'file'],
      default: 'url'
    },
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser'
  }
}, {
  timestamps: true
});

export default mongoose.model('EvaContent', evaContentSchema);