import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String },
    text: { type: String },
    isRead: { type: Boolean,default:false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('message', messageSchema);