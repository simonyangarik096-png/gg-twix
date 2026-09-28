import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  email: {
    type: String,
    default: '',
    trim: true
  },
  role: {
    type: String,
    enum: ['yana', 'eva', 'general', 'leader'],
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser'
  }
}, {
  timestamps: true
});

// Ավտոմատ hash անել password-ը, երբ այն փոփոխվում է
adminUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Համեմատել մուտքագրված password-ը DB-ի hash-ված password-ի հետ
adminUserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model('AdminUser', adminUserSchema);