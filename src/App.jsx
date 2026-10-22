import { useState, useEffect } from 'react';
import AuthScreen from './components/AuthScreen';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategoryManager from './components/CategoryManager';
import { 
  fetchExpenses, 
  createExpenseApi, 
  updateExpenseApi, 
  deleteExpenseApi, 
  fetchCategories, 
  createCategoryApi, 
  updateCategoryApi, 
  deleteCategoryApi 
} from './services/api';
import { LogOut, Wallet, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { formatCurrency } from './utils/formatters';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Período actual en formato "YYYY-MM"
  const currentDateStr = new Date().toISOString().slice(0, 7);
  const [selectedPeriod, setSelectedPeriod] = useState(currentDateStr);

  // Cargar datos al iniciar sesión o cambiar de período
  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token, selectedPeriod]);

  const loadData = async () => {
    try {
      const [expensesData, categoriesData] = await Promise.all([
        fetchExpenses(selectedPeriod),
        fetchCategories()
      ]);
      setExpenses(expensesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      if (error.message.includes('Token') || error.message.includes('401') || error.message.includes('403')) {
        handleLogout();
      }
    }
  };

  const handleLoginSuccess = (email) => {
    setToken(localStorage.getItem('token'));
    setUserEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setToken(null);
    setUserEmail('');
    setExpenses([]);
    setCategories([]);
  };

  // --- ACCIONES DE GASTOS ---
  const handleAddExpense = async (expenseData) => {
  try {
    const newExpense = await createExpenseApi(expenseData);
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]); // <-- Añade el gasto al inicio de la lista
  } catch (error) {
    console.error("Error al agregar gasto:", error);
  }
};

  const handleUpdateExpense = async (updatedExpenseData) => {
    try {
      await updateExpenseApi(updatedExpenseData.id || updatedExpenseData._id, updatedExpenseData);
      loadData();
    } catch (error) {
      console.error('Error al actualizar movimiento:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpenseApi(id);
      loadData();
    } catch (error) {
      console.error('Error al eliminar movimiento:', error);
    }
  };

  // --- ACCIONES DE CATEGORÍAS ---
  const handleAddCategory = async (catData) => {
    try {
      await createCategoryApi(catData);
      loadData();
    } catch (error) {
      console.error('Error al agregar categoría:', error);
    }
  };

  const handleUpdateCategory = async (catData) => {
    try {
      await updateCategoryApi(catData.id || catData._id, catData);
      loadData();
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategoryApi(id);
      loadData();
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
    }
  };

  // Si no hay token, mostramos la pantalla de autenticación
  if (!token) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // Cálculos de totales del período
  const totalIncome = expenses
    .filter((e) => e.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = expenses
    .filter((e) => e.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-12">
      {/* Navbar Superior */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-base leading-tight">Gestor de Gastos</h1>
              <p className="text-xs text-slate-500 truncate max-w-[200px] sm:max-w-xs">{userEmail}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-xl transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-4xl mx-auto px-4 pt-6 space-y-6">
        
        {/* Selector de Período y Tarjetas de Resumen */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-xs font-bold text-slate-700">Período:</span>
            <input
              type="month"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Balance</span>
              <span className="text-xs sm:text-sm font-extrabold text-blue-600">{formatCurrency(totalBalance)}</span>
            </div>
            <div className="bg-emerald-50/50 p-2 rounded-xl border border-emerald-100">
              <span className="text-[10px] uppercase font-bold text-emerald-600 block flex items-center justify-center gap-0.5"><TrendingUp className="w-3 h-3"/>Ingresos</span>
              <span className="text-xs sm:text-sm font-extrabold text-emerald-600">{formatCurrency(totalIncome)}</span>
            </div>
            <div className="bg-rose-50/50 p-2 rounded-xl border border-rose-100">
              <span className="text-[10px] uppercase font-bold text-rose-600 block flex items-center justify-center gap-0.5"><TrendingDown className="w-3 h-3"/>Gastos</span>
              <span className="text-xs sm:text-sm font-extrabold text-rose-600">{formatCurrency(totalExpense)}</span>
            </div>
          </div>
        </div>

        {/* Gestor de Categorías */}
        <CategoryManager
          categories={categories}
          onAddCategory={handleAddCategory}
          onUpdateCategory={handleUpdateCategory}
          onDeleteCategory={handleDeleteCategory}
        />

        {/* Formulario para Nuevo Movimiento */}
        <ExpenseForm
          categories={categories}
          onAddExpense={handleAddExpense}
        />

        {/* Listado de Movimientos del Período */}
        <ExpenseList
          expenses={expenses}
          categories={categories}
          onDeleteExpense={handleDeleteExpense}
          onUpdateExpense={handleUpdateExpense}
        />

      </main>
    </div>
  );
}

export default App;