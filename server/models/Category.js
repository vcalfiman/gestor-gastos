import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: 'Tag' }
  },
  { timestamps: true }
);

categorySchema.index({ userId: 1 });
export default mongoose.model('Category', categorySchema);