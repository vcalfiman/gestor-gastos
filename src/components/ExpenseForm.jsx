import { useState, useEffect, useRef } from 'react';
import { CirclePlus, CircleMinus } from 'lucide-react';
import { CategoryIcon } from '../utils/categoryIcons';
import IconPickerModal from './IconPickerModal';
import { formatCurrency } from '../utils/formatters';

function ExpenseForm({ onAddExpense, categories }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState(categories[0]?.name || 'Varios');
  
  // Estado para la fecha, inicializado con la fecha actual en formato YYYY-MM-DD
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [selectedIcon, setSelectedIcon] = useState('Zap');
  const [isIconModalOpen, setIsIconModalOpen] = useState(false);

  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const typeDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  useEffect(() => {
    if (categories.length > 0 && !categories.some((c) => c.name === category)) {
      setCategory(categories[0].name);
    }
  }, [categories, category]);

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
  const categoryDefaultIcon = selectedCategoryObj?.icon || 'Tag';

  const handleCategorySelect = (catName) => {
    setCategory(catName);
    setIsCategoryDropdownOpen(false);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || !amount || Number(amount) <= 0) return;

    onAddExpense({
      description: description.trim(),
      amount: Number(amount),
      type,
      category,
      icon: selectedIcon || categoryDefaultIcon,
      date, // Enviamos la fecha seleccionada manualmente por el usuario
    });

    setDescription('');
    setAmount('');
    // Opcional: si prefieres que la fecha vuelva a la de hoy tras guardar, o mantenerla. La dejamos libre.
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        Agregar Movimiento
      </h3>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 items-center"
      >
        {/* Selector de Ícono para el Movimiento */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => setIsIconModalOpen(true)}
            className="w-full h-10 flex items-center justify-center gap-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors bg-slate-50"
            title="Seleccionar ícono del movimiento"
          >
            <CategoryIcon
              iconName={selectedIcon}
              className="w-5 h-5 text-blue-600"
            />
            <span className="text-xs text-slate-500 font-medium sm:hidden">
              Cambiar ícono
            </span>
          </button>
        </div>

        {/* Descripción */}
        <input
          type="text"
          placeholder="Ej: Luz, Agua, Supermercado"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Monto */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Monto"
            value={amount ? formatCurrency(Number(amount)) : ''}
            onChange={handleAmountChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Selector de Fecha */}
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Dropdown: Tipo (Ingreso / Gasto) */}
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

        {/* Dropdown: Categorías */}
        <div className="relative" ref={categoryDropdownRef}>
          <button
            type="button"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            className="w-full flex items-center justify-between px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="flex items-center gap-2 truncate">
              <CategoryIcon
                iconName={categoryDefaultIcon}
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
                  key={cat.id || cat._id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.name)}
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

        {/* Botón Guardar */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
        >
          Agregar
        </button>
      </form>

      {/* Modal para elegir el Ícono del Movimiento */}
      <IconPickerModal
        isOpen={isIconModalOpen}
        onClose={() => setIsIconModalOpen(false)}
        onSelectIcon={(iconName) => {
          setSelectedIcon(iconName);
          setIsIconModalOpen(false);
        }}
        currentIcon={selectedIcon}
      />
    </div>
  );
}

export default ExpenseForm;