import { useState, useEffect } from 'react';
import Summary from './components/Summary';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategoryManager from './components/CategoryManager';

// Categorías iniciales por defecto
const initialCategories = [
  { id: 'cat-1', name: 'Comida', icon: 'Utensils' },
  { id: 'cat-2', name: 'Hogar', icon: 'Home' },
  { id: 'cat-3', name: 'Servicios', icon: 'Zap' },
  { id: 'cat-4', name: 'Ingresos', icon: 'DollarSign' },
  { id: 'cat-5', name: 'Varios', icon: 'Tag' },
];

// Movimientos iniciales por defecto
const initialExpenses = [
  {
    id: '1',
    description: 'Supermercado',
    amount: 45000,
    type: 'expense',
    category: 'Comida',
    date: '2026-09-24'
  },
  {
    id: '2',
    description: 'Sueldo',
    amount: 800000,
    type: 'income',
    category: 'Ingresos',
    date: '2026-09-20'
  }
];

function App() {
  // Estado de Gastos/Ingresos con localStorage
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : initialExpenses;
  });

  // Estado de Categorías con localStorage
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : initialCategories;
  });

  // Guardar cambios de expenses en localStorage
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Guardar cambios de categories en localStorage
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  // --- Handlers para Movimientos ---
  const handleAddExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleUpdateExpense = (updatedExpense) => {
    setExpenses(
      expenses.map((item) =>
        item.id === updatedExpense.id ? updatedExpense : item
      )
    );
  };

  // --- Handlers para Categorías ---
  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleUpdateCategory = (updatedCategory) => {
    setCategories(
      categories.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-8">
          Gestor de Gastos
        </h1>

        {/* Resumen Dashboard */}
        <Summary expenses={expenses} />

        {/* Gestor de Categorías */}
        <CategoryManager
          categories={categories}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          onUpdateCategory={handleUpdateCategory}
        />

        {/* Formulario de Alta */}
        <ExpenseForm
          onAddExpense={handleAddExpense}
          categories={categories}
        />

        {/* Listado de Movimientos */}
        <ExpenseList
          expenses={expenses}
          categories={categories}
          onDeleteExpense={handleDeleteExpense}
          onUpdateExpense={handleUpdateExpense}
        />
      </div>
    </div>
  );
}

export default App;