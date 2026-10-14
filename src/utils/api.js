const API_URL = 'http://localhost:5000/api';

// --- CATEGORÍAS ---
export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error('Error al obtener categorías');
  return res.json();
};

export const createCategoryApi = async (categoryData) => {
  const res = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData),
  });
  if (!res.ok) throw new Error('Error al crear categoría');
  return res.json();
};

export const updateCategoryApi = async (id, categoryData) => {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData),
  });
  if (!res.ok) throw new Error('Error al actualizar categoría');
  return res.json();
};

export const deleteCategoryApi = async (id) => {
  const res = await fetch(`${API_URL}/categories/${id}`);
  if (!res.ok) throw new Error('Error al eliminar categoría');
  return res.json();
};

// --- MOVIMIENTOS (GASTOS E INGRESOS) ---
export const fetchExpenses = async (period) => {
  const res = await fetch(`${API_URL}/expenses?period=${period}`);
  if (!res.ok) throw new Error('Error al obtener movimientos');
  return res.json();
};

export const createExpenseApi = async (expenseData) => {
  const res = await fetch(`${API_URL}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expenseData),
  });
  if (!res.ok) throw new Error('Error al crear movimiento');
  return res.json();
};

export const updateExpenseApi = async (id, expenseData) => {
  const res = await fetch(`${API_URL}/expenses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expenseData),
  });
  if (!res.ok) throw new Error('Error al actualizar movimiento');
  return res.json();
};

export const deleteExpenseApi = async (id) => {
  const res = await fetch(`${API_URL}/expenses/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar movimiento');
  return res.json();
};