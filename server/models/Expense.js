import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    type: { type: String, enum: ['expense', 'income'], required: true },
    category: { type: String, required: true },
    icon: { type: String, default: 'Tag' }, // Ícono individual del movimiento
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

// Índice para optimizar consultas por rango de fecha (Mes/Año)
expenseSchema.index({ date: 1 });

export default mongoose.model('Expense', expenseSchema);