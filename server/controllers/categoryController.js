import Category from '../models/Category.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.userId });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías', error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'El nombre de la categoría es obligatorio' });
    }

    const newCategory = await Category.create({
      userId: req.userId,
      name,
      icon: icon || 'Tag'
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear categoría', error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon } = req.body; // Extraemos solo lo necesario

    const updateData = {};
    if (name) updateData.name = name;
    if (icon) updateData.icon = icon;

    const updated = await Category.findOneAndUpdate(
      { _id: id, userId: req.userId }, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar categoría', error: error.message });
  }
};












export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findOneAndDelete({ _id: id, userId: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar categoría', error: error.message });
  }
};