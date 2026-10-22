import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    type: { type: String, enum: ['expense', 'income'], required: true },
    category: { type: String, required: true },
    icon: { type: String, default: 'Tag' },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

expenseSchema.index({ userId: 1, date: 1 });
export default mongoose.model('Expense', expenseSchema);