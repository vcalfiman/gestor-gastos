import { useState } from 'react';
import { CategoryIcon } from '../utils/categoryIcons';

function ExpenseItem({ expense, categories, onDeleteExpense, onUpdateExpense, formatCurrency }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(expense.description);
  const [amount, setAmount] = useState(expense.amount);
  const [type, setType] = useState(expense.type);
  const [category, setCategory] = useState(expense.category);

  const handleSave = () => {
    if (!description.trim() || !amount) return;

    onUpdateExpense({
      ...expense,
      description,
      amount: Number(amount),
      type,
      category
    });

    setIsEditing(false);
  };

  // Buscar el nombre del ícono correspondiente a la categoría del gasto
  const currentCategoryIcon = categories.find((c) => c.name === expense.category)?.icon || 'Tag';

  if (isEditing) {
    return (
      <li className="flex flex-wrap items-center gap-2 py-3 border-b border-slate-100 last:border-0">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-2 py-1 border border-slate-300 rounded text-sm w-28 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-2 py-1 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="expense">Gasto</option>
          <option value="income">Ingreso</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-2 py-1 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleSave}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1 rounded transition-colors"
        >
          Guardar
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold px-3 py-1 rounded transition-colors"
        >
          Cancelar
        </button>
      </li>
    );
  }

  return (
    <li className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
        <span className="font-semibold text-slate-800">{expense.description}</span>
        <span className="inline-flex items-center gap-1.5 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-medium w-fit">
          <CategoryIcon iconName={currentCategoryIcon} className="w-3.5 h-3.5 text-slate-500" />
          {expense.category}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`font-bold ${
            expense.type === 'income' ? 'text-emerald-600' : 'text-slate-700'
          }`}
        >
          {expense.type === 'income' ? '+' : '-'}{formatCurrency(expense.amount)}
        </span>
        <button
          onClick={() => setIsEditing(true)}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium border border-blue-200 hover:border-blue-400 px-2.5 py-1 rounded transition-colors"
        >
          Editar
        </button>
        <button
          onClick={() => onDeleteExpense(expense.id)}
          className="text-xs text-rose-600 hover:text-rose-800 font-medium border border-rose-200 hover:border-rose-400 px-2.5 py-1 rounded transition-colors"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}

function ExpenseList({ expenses, categories, onDeleteExpense, onUpdateExpense }) {
  const [filterType, setFilterType] = useState('all');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredExpenses = expenses.filter((expense) => {
    if (filterType === 'income') return expense.type === 'income';
    if (filterType === 'expense') return expense.type === 'expense';
    return true;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800">Movimientos</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="filter" className="text-xs font-semibold text-slate-500">
            Filtrar:
          </label>
          <select
            id="filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos</option>
            <option value="income">Solo Ingresos</option>
            <option value="expense">Solo Gastos</option>
          </select>
        </div>
      </div>

      {filteredExpenses.length > 0 ? (
        <ul className="divide-y divide-slate-100">
          {filteredExpenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              categories={categories}
              onDeleteExpense={onDeleteExpense}
              onUpdateExpense={onUpdateExpense}
              formatCurrency={formatCurrency}
            />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500 text-center py-4">
          No hay registros para este filtro.
        </p>
      )}
    </div>
  );
}

export default ExpenseList;