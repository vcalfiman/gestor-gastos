import Expense from '../models/Expense.js';

// GET: Obtener movimientos del usuario autenticado por período
export const getExpenses = async (req, res) => {
  try {
    const { period } = req.query;
    let query = { userId: req.userId }; // <- Filtrar por el usuario logueado

    if (period) {
      const [year, month] = period.split('-').map(Number);
      const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
      const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

      query.date = { $gte: startDate, $lte: endDate };
    }

    const expenses = await Expense.find(query).sort({ date: -1, createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener movimientos', error: error.message });
  }
};

// POST: Crear movimiento asignado al usuario
export const createExpense = async (req, res) => {
  try {
    const { description, amount, type, category, icon, date } = req.body;
    
    const newExpense = await Expense.create({
      userId: req.userId, // <- Asociar al usuario
      description,
      amount,
      type,
      category,
      icon,
      date
    });

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear movimiento', error: error.message });
  }
};

// PUT: Actualizar movimiento asegurando que pertenezca al usuario
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Expense.findOneAndUpdate(
      { _id: id, userId: req.userId }, 
      req.body, 
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Movimiento no encontrado o no autorizado' });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar movimiento', error: error.message });
  }
};

// DELETE: Eliminar movimiento del usuario
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.findOneAndDelete({ _id: id, userId: req.userId });

    if (!deleted) {
      return res.status(404).json({ message: 'Movimiento no encontrado o no autorizado' });
    }

    res.json({ message: 'Movimiento eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar movimiento', error: error.message });
  }
};