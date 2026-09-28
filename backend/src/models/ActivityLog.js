import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser'
  },
  username: {
    type: String,
    default: ''
  },
  action: {
    type: String,
    enum: ['login', 'logout', 'create', 'update', 'delete', 'upload'],
    required: true
  },
  target: {
    type: String,
    default: ''
  },
  details: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('ActivityLog', activityLogSchema);