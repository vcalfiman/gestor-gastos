import { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Tag } from 'lucide-react';
import { CategoryIcon } from '../utils/categoryIcons';
import IconPickerModal from './IconPickerModal';

function CategoryManager({
  categories,
  onAddCategory,
  onDeleteCategory,
  onUpdateCategory,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('Tag');

  // Estado para edición
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editIcon, setEditIcon] = useState('Tag');

  // Modales de selección de íconos
  const [isNewIconPickerOpen, setIsNewIconPickerOpen] = useState(false);
  const [isEditIconPickerOpen, setIsEditIconPickerOpen] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    onAddCategory({
      name: newCatName.trim(),
      icon: newCatIcon,
    });

    setNewCatName('');
    setNewCatIcon('Tag');
  };

  const startEditing = (category) => {
    setEditingId(category.id || category._id);
    setEditName(category.name);
    setEditIcon(category.icon || 'Tag');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
    setEditIcon('Tag');
  };

  const saveEditing = (category) => {
    if (!editName.trim()) return;

    onUpdateCategory({
      ...category,
      id: category.id || category._id,
      name: editName.trim(),
      icon: editIcon,
    });

    cancelEditing();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 font-bold text-slate-800 text-base focus:outline-none"
        >
          <Tag className="w-5 h-5 text-blue-600" />
          <span>Gestionar Categorías</span>
          <span className="text-xs text-slate-400">
            ({categories.length}) {isExpanded ? '▲' : '▼'}
          </span>
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4 pt-2 border-t border-slate-100">
          {/* Formulario para agregar nueva categoría */}
          <form onSubmit={handleAdd} className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsNewIconPickerOpen(true)}
              className="p-2 border border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-center min-w-[42px]"
              title="Seleccionar ícono para nueva categoría"
            >
              <CategoryIcon iconName={newCatIcon} className="w-5 h-5 text-blue-600" />
            </button>

            <input
              type="text"
              placeholder="Nueva categoría (ej: Hogar, Comida)..."
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
              title="Agregar categoría"
            >
              <Plus className="w-5 h-5" />
            </button>
          </form>

          {/* Lista de Categorías */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 max-h-60 overflow-y-auto">
            {categories.map((cat) => {
              const catId = cat.id || cat._id;
              const isEditing = editingId === catId;

              return (
                <div
                  key={catId}
                  className="flex items-center justify-between p-2.5 border border-slate-200 rounded-lg bg-slate-50/50"
                >
                  {isEditing ? (
                    <div className="flex items-center gap-1.5 w-full">
                      <button
                        type="button"
                        onClick={() => setIsEditIconPickerOpen(true)}
                        className="p-1.5 border border-slate-300 rounded bg-white hover:bg-slate-50 transition-colors"
                      >
                        <CategoryIcon iconName={editIcon} className="w-4 h-4 text-blue-600" />
                      </button>

                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <button
                        onClick={() => saveEditing(cat)}
                        className="p-1.5 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                        title="Guardar"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="p-1.5 bg-slate-300 text-slate-700 rounded hover:bg-slate-400 transition-colors"
                        title="Cancelar"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 truncate">
                        <div className="p-1.5 bg-white rounded border border-slate-200 flex-shrink-0">
                          <CategoryIcon iconName={cat.icon || 'Tag'} className="w-4 h-4 text-slate-600" />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 truncate">
                          {cat.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEditing(cat)}
                          className="p-1 text-slate-400 hover:text-blue-600 rounded transition-colors"
                          title="Editar categoría"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteCategory(catId)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                          title="Eliminar categoría"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal para Seleccionar Ícono de Nueva Categoría */}
      <IconPickerModal
        isOpen={isNewIconPickerOpen}
        onClose={() => setIsNewIconPickerOpen(false)}
        onSelectIcon={(iconName) => {
          setNewCatIcon(iconName);
          setIsNewIconPickerOpen(false);
        }}
        currentIcon={newCatIcon}
      />

      {/* Modal para Seleccionar Ícono al Editar Categoría */}
      <IconPickerModal
        isOpen={isEditIconPickerOpen}
        onClose={() => setIsEditIconPickerOpen(false)}
        onSelectIcon={(iconName) => {
          setEditIcon(iconName);
          setIsEditIconPickerOpen(false);
        }}
        currentIcon={editIcon}
      />
    </div>
  );
}

export default CategoryManager;