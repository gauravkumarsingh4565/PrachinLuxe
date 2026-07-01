import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this user.'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email for this user.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['NORMALUSER', 'ADMIN'],
      default: 'NORMALUSER',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent compiling model multiple times if it's already compiled
export default mongoose.models.User || mongoose.model('User', UserSchema);
