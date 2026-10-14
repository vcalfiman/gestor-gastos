import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    icon: { type: String, required: true, default: 'Tag' }
  },
  { timestamps: true }
);

export default mongoose.model('Category', categorySchema);