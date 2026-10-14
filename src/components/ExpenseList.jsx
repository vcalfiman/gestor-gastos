import { useState } from 'react';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { CategoryIcon } from '../utils/categoryIcons';
import IconPickerModal from './IconPickerModal';
import { formatCurrency } from '../utils/formatters';

function ExpenseList({ expenses, categories, onDeleteExpense, onUpdateExpense }) {
  const [editingId, setEditingId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editIcon, setEditIcon] = useState('Tag');
  
  // Estado para controlar el modal de selección de ícono en edición
  const [isEditIconModalOpen, setIsEditIconModalOpen] = useState(false);

  const startEditing = (expense) => {
    setEditingId(expense.id || expense._id);
    setEditDescription(expense.description);
    setEditAmount(expense.amount);
    setEditCategory(expense.category);
    
    const categoryObj = categories.find((c) => c.name === expense.category);
    setEditIcon(expense.icon || categoryObj?.icon || 'Tag');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditDescription('');
    setEditAmount('');
    setEditCategory('');
    setEditIcon('Tag');
  };

  const saveEditing = (expense) => {
    if (!editDescription.trim() || !editAmount) return;

    onUpdateExpense({
      ...expense,
      id: expense.id || expense._id,
      description: editDescription,
      amount: Number(editAmount),
      category: editCategory,
      icon: editIcon, // Guardamos el ícono actualizado
    });

    cancelEditing();
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center text-slate-400 text-sm">
        No hay movimientos registrados para este período.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <h3 className="text-base font-bold text-slate-800">Movimientos del Período</h3>
      </div>

      <div className="divide-y divide-slate-100">
        {expenses.map((expense) => {
          const itemId = expense.id || expense._id;
          const isEditing = editingId === itemId;
          const categoryObj = categories.find((c) => c.name === expense.category);
          
          const displayIcon = expense.icon || categoryObj?.icon || 'Tag';

          return (
            <div
              key={itemId}
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
            >
              {isEditing ? (
                /* --- MODO EDICIÓN --- */
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                  {/* Botón para cambiar ícono en edición */}
                  <button
                    type="button"
                    onClick={() => setIsEditIconModalOpen(true)}
                    className="p-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-colors flex items-center justify-center flex-shrink-0"
                    title="Cambiar ícono"
                  >
                    <CategoryIcon iconName={editIcon} className="w-5 h-5 text-blue-600" />
                  </button>

                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full sm:flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Descripción"
                  />

                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="w-full sm:w-28 px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Monto"
                  />

                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full sm:w-36 px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id || cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <button
                      onClick={() => saveEditing(expense)}
                      className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      title="Guardar"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="p-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 transition-colors"
                      title="Cancelar"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* --- MODO VISTA NORMAL --- */
                <>
                  <div className="flex items-center gap-3 truncate mr-4">
                    <div className="p-2.5 bg-slate-100 rounded-xl flex-shrink-0">
                      <CategoryIcon
                        iconName={displayIcon}
                        className="w-5 h-5 text-slate-600"
                      />
                    </div>
                    <div className="truncate">
                      <p className="font-semibold text-slate-800 text-sm truncate">
                        {expense.description}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                          {expense.category}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {expense.date ? expense.date.split('T')[0] : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span
                      className={`font-bold text-sm ${
                        expense.type === 'income'
                          ? 'text-emerald-600'
                          : 'text-slate-800'
                      }`}
                    >
                      {expense.type === 'income' ? '+ ' : '- '}
                      {formatCurrency(expense.amount)}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => startEditing(expense)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar movimiento"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteExpense(itemId)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Eliminar movimiento"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal de Íconos para la Edición */}
      <IconPickerModal
        isOpen={isEditIconModalOpen}
        onClose={() => setIsEditIconModalOpen(false)}
        onSelectIcon={(iconName) => {
          setEditIcon(iconName);
          setIsEditIconModalOpen(false);
        }}
        currentIcon={editIcon}
      />
    </div>
  );
}

export default ExpenseList;