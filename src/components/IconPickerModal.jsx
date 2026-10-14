import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { CATEGORY_ICONS, CategoryIcon } from '../utils/categoryIcons';

function IconPickerModal({ isOpen, onClose, onSelectIcon, currentIcon }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredIcons = CATEGORY_ICONS.filter((iconName) =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800">
            Seleccionar Ícono
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Buscador */}
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar ícono (ej. home, car, zap)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Grid de Íconos */}
        <div className="p-4 overflow-y-auto grid grid-cols-5 gap-2 max-h-60">
          {filteredIcons.map((iconName) => {
            const isSelected = currentIcon === iconName;
            return (
              <button
                key={iconName}
                type="button"
                onClick={() => onSelectIcon(iconName)}
                className={`p-3 rounded-lg flex flex-col items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-blue-100 text-blue-600 border border-blue-300'
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
                title={iconName}
              >
                <CategoryIcon iconName={iconName} className="w-6 h-6" />
              </button>
            );
          })}

          {filteredIcons.length === 0 && (
            <div className="col-span-5 text-center text-xs text-slate-400 py-6">
              No se encontraron íconos con "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IconPickerModal;