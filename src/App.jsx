import { useState, useEffect } from 'react';
import Summary from './components/Summary';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategoryManager from './components/CategoryManager';
import PeriodSelector from './components/PeriodSelector';
import {
  fetchCategories,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
  fetchExpenses,
  createExpenseApi,
  updateExpenseApi,
  deleteExpenseApi,
} from './utils/api';

function App() {
  const getCurrentPeriod = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };

  const [selectedPeriod, setSelectedPeriod] = useState(getCurrentPeriod);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar Categorías iniciales desde MongoDB
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        // Mapeamos _id de MongoDB a id para mantener compatibilidad
        const formatted = data.map((c) => ({ ...c, id: c._id }));
        setCategories(formatted);
      } catch (err) {
        console.error('Error al cargar categorías:', err);
      }
    };
    loadCategories();
  }, []);

  // Cargar Movimientos cada vez que cambia el Período
  useEffect(() => {
    const loadExpenses = async () => {
      setLoading(true);
      try {
        const data = await fetchExpenses(selectedPeriod);
        const formatted = data.map((e) => ({ ...e, id: e._id }));
        setExpenses(formatted);
      } catch (err) {
        console.error('Error al cargar movimientos:', err);
      } finally {
        setLoading(false);
      }
    };
    loadExpenses();
  }, [selectedPeriod]);

  // --- Handlers para Movimientos ---
  const handleAddExpense = async (newExpenseData) => {
    try {
      const saved = await createExpenseApi(newExpenseData);
      const formatted = { ...saved, id: saved._id };
      setExpenses([formatted, ...expenses]);
    } catch (err) {
      console.error('Error al agregar movimiento:', err);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpenseApi(id);
      setExpenses(expenses.filter((e) => e.id !== id));
    } catch (err) {
      console.error('Error al eliminar movimiento:', err);
    }
  };

  const handleUpdateExpense = async (updatedExpense) => {
    try {
      const saved = await updateExpenseApi(updatedExpense.id, updatedExpense);
      const formatted = { ...saved, id: saved._id };
      setExpenses(
        expenses.map((e) => (e.id === formatted.id ? formatted : e))
      );
    } catch (err) {
      console.error('Error al actualizar movimiento:', err);
    }
  };

  // --- Handlers para Categorías ---
  const handleAddCategory = async (newCatData) => {
    try {
      const saved = await createCategoryApi(newCatData);
      const formatted = { ...saved, id: saved._id };
      setCategories([...categories, formatted]);
    } catch (err) {
      console.error('Error al agregar categoría:', err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategoryApi(id);
      setCategories(categories.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Error al eliminar categoría:', err);
    }
  };

  const handleUpdateCategory = async (updatedCat) => {
    try {
      const saved = await updateCategoryApi(updatedCat.id, updatedCat);
      const formatted = { ...saved, id: saved._id };
      setCategories(
        categories.map((c) => (c.id === formatted.id ? formatted : c))
      );
    } catch (err) {
      console.error('Error al actualizar categoría:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-8">
          Gestor de Gastos (MERN)
        </h1>

        <PeriodSelector
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />

        <Summary expenses={expenses} />

        <CategoryManager
          categories={categories}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          onUpdateCategory={handleUpdateCategory}
        />

        <ExpenseForm
          onAddExpense={handleAddExpense}
          categories={categories}
          selectedPeriod={selectedPeriod}
        />

        {loading ? (
          <div className="text-center py-8 text-slate-500 font-medium text-sm">
            Cargando datos desde MongoDB...
          </div>
        ) : (
          <ExpenseList
            expenses={expenses}
            categories={categories}
            onDeleteExpense={handleDeleteExpense}
            onUpdateExpense={handleUpdateExpense}
          />
        )}
      </div>
    </div>
  );
}

export default App;