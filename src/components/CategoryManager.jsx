import { useState } from 'react';
import { AVAILABLE_ICONS, CategoryIcon } from '../utils/categoryIcons';

function CategoryManager({ categories, onAddCategory, onDeleteCategory, onUpdateCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Tag');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingId) {
      onUpdateCategory({ id: editingId, name, icon: selectedIcon });
      setEditingId(null);
    } else {
      onAddCategory({
        id: crypto.randomUUID(),
        name,
        icon: selectedIcon,
      });
    }

    setName('');
    setSelectedIcon('Tag');
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);
    setSelectedIcon(category.icon);
  };

  const handleCancel = () => {
    setEditingId(null);
    setName('');
    setSelectedIcon('Tag');
  };

  // Filtrado de íconos dentro del modal
  const filteredIcons = Object.entries(AVAILABLE_ICONS).filter(([key, item]) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Gestión de Categorías</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg transition-colors"
        >
          {isOpen ? 'Ocultar Panel' : 'Administrar Categorías'}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          {/* Formulario Crear / Editar */}
          <form onSubmit={handleSubmit} className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              {editingId ? 'Editar Categoría' : 'Nueva Categoría'}
            </h4>

            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <input
                type="text"
                placeholder="Nombre de la categoría"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full sm:flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Botón para abrir el Modal de Íconos */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <div className="p-1 bg-slate-100 rounded border border-slate-200">
                  <CategoryIcon iconName={selectedIcon} className="w-4 h-4 text-blue-600" />
                </div>
                <span>Cambiar Ícono</span>
              </button>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
                >
                  {editingId ? 'Guardar' : 'Agregar'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold px-3 py-2.5 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Lista de Categorías */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white rounded-md border border-slate-200 text-slate-700">
                    <CategoryIcon iconName={cat.icon} className="w-4 h-4 text-slate-700" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">{cat.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="text-xs text-blue-600 hover:text-blue-800 px-1.5 py-0.5 font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDeleteCategory(cat.id)}
                    className="text-xs text-rose-600 hover:text-rose-800 px-1.5 py-0.5 font-medium"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL SELECTOR DE ÍCONOS */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-5 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-bold text-slate-800 text-base">Seleccionar Ícono</h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>

            {/* Buscador de íconos */}
            <div className="py-3">
              <input
                type="text"
                placeholder="Buscar ícono (ej. Auto, Comida, Cine)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Grid de Íconos */}
            <div className="flex-1 overflow-y-auto grid grid-cols-4 sm:grid-cols-6 gap-2 p-1">
              {filteredIcons.map(([iconKey, item]) => (
                <button
                  key={iconKey}
                  type="button"
                  onClick={() => {
                    setSelectedIcon(iconKey);
                    setIsModalOpen(false);
                    setSearchTerm('');
                  }}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                    selectedIcon === iconKey
                      ? 'border-blue-500 bg-blue-50 text-blue-600 ring-2 ring-blue-200'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <CategoryIcon iconName={iconKey} className="w-5 h-5 mb-1" />
                  <span className="text-[10px] text-slate-500 font-medium truncate w-full text-center">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryManager;