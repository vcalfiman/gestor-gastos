import { useState, useEffect, useRef } from 'react';
import { CirclePlus, CircleMinus } from 'lucide-react';
import { CategoryIcon } from '../utils/categoryIcons';

function ExpenseForm({ onAddExpense, categories }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState(categories[0]?.name || 'Varios');

  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const typeDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  useEffect(() => {
    if (categories.length > 0 && !categories.some((c) => c.name === category)) {
      setCategory(categories[0].name);
    }
  }, [categories, category]);

  // Cierra los desplegables al hacer clic fuera de ellos
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(event.target)
      ) {
        setIsTypeDropdownOpen(false);
      }
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedCategoryObj = categories.find((c) => c.name === category);
  const currentIconName = selectedCategoryObj?.icon || 'Tag';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || !amount) return;

    onAddExpense({
      id: crypto.randomUUID(),
      description,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription('');
    setAmount('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        Agregar Movimiento
      </h3>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
      >
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Custom Dropdown: Tipo (Gasto / Ingreso) */}
        <div className="relative" ref={typeDropdownRef}>
          <button
            type="button"
            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
            className="w-full flex items-center justify-between px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="flex items-center gap-2 truncate">
              {type === 'expense' ? (
                <CircleMinus className="w-4 h-4 text-rose-600 flex-shrink-0" />
              ) : (
                <CirclePlus className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              )}
              <span className="truncate">
                {type === 'expense' ? 'Gasto' : 'Ingreso'}
              </span>
            </div>
            <span className="text-xs text-slate-400 ml-1">▼</span>
          </button>

          {isTypeDropdownOpen && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 overflow-hidden divide-y divide-slate-50">
              <button
                type="button"
                onClick={() => {
                  setType('expense');
                  setIsTypeDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left hover:bg-slate-50 transition-colors ${
                  type === 'expense'
                    ? 'bg-rose-50 text-rose-700 font-semibold'
                    : 'text-slate-700'
                }`}
              >
                <CircleMinus className="w-4 h-4 flex-shrink-0 text-rose-600" />
                <span>Gasto</span>
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setType('income');
                  setIsTypeDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left hover:bg-slate-50 transition-colors ${
                  type === 'income'
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-700'
                }`}
              >
                <CirclePlus className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span>Ingreso</span>
              </button>
            </div>
          )}
        </div>

        {/* Custom Dropdown: Categorías */}
        <div className="relative" ref={categoryDropdownRef}>
          <button
            type="button"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            className="w-full flex items-center justify-between px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="flex items-center gap-2 truncate">
              <CategoryIcon
                iconName={currentIconName}
                className="w-4 h-4 text-blue-600 flex-shrink-0"
              />
              <span className="truncate">{category}</span>
            </div>
            <span className="text-xs text-slate-400 ml-1">▼</span>
          </button>

          {isCategoryDropdownOpen && (
            <div className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-lg z-20 divide-y divide-slate-50">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setCategory(cat.name);
                    setIsCategoryDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left hover:bg-slate-50 transition-colors ${
                    category === cat.name
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-slate-700'
                  }`}
                >
                  <CategoryIcon
                    iconName={cat.icon || 'Tag'}
                    className="w-4 h-4 flex-shrink-0 text-slate-500"
                  />
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
        >
          Agregar
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;