import Expense from '../models/Expense.js';

// GET: Filtra movimientos por el período enviado ("YYYY-MM")
export const getExpenses = async (req, res) => {
  try {
    const { period } = req.query; // Ejemplo: "2026-09"
    let query = {};

    if (period) {
      const [year, month] = period.split('-').map(Number);
      
      // Creamos la fecha de inicio en UTC exacto para el primer día del mes (00:00:00.000)
      const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
      
      // Creamos la fecha de fin en UTC exacto para el último día del mes (23:59:59.999)
      const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

      query.date = { $gte: startDate, $lte: endDate };
    }

    const expenses = await Expense.find(query).sort({ date: -1, createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener movimientos', error: error.message });
  }
};

export const createExpense = async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const saved = await newExpense.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear movimiento', error: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar movimiento', error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movimiento eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar movimiento', error: error.message });
  }
};