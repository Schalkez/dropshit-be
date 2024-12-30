import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema(
  {
    isRead: { type: Boolean, default: true },
    content: { type: String },
    type: {
      type: String,
    },
    user: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'user',
      },
    ],
  },

  {
    timestamps: true,
  }
);

export default mongoose.model('notification', BannerSchema);