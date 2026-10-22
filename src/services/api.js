const API_URL = 'http://localhost:5000/api';

// Función auxiliar para obtener los headers con el token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

// --- AUTENTICACIÓN ---
export async function loginUser(credentials) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al iniciar sesión');
  return data; // Retorna { token, email }
}

export async function registerUser(credentials) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al registrarse');
  return data; // Retorna { token, email }
}

// --- GASTOS ---
export async function fetchExpenses(period) {
  const res = await fetch(`${API_URL}/expenses?period=${period}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener movimientos');
  return res.json();
}

export async function createExpenseApi(expenseData) {
  const res = await fetch(`${API_URL}/expenses`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(expenseData),
  });
  if (!res.ok) throw new Error('Error al crear movimiento');
  return res.json();
}

export async function updateExpenseApi(id, expenseData) {
  const res = await fetch(`${API_URL}/expenses/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(expenseData),
  });
  if (!res.ok) throw new Error('Error al actualizar movimiento');
  return res.json();
}

export async function deleteExpenseApi(id) {
  const res = await fetch(`${API_URL}/expenses/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar movimiento');
  return res.json();
}

// --- CATEGORÍAS ---
export async function fetchCategories() {
  const res = await fetch(`${API_URL}/categories`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener categorías');
  return res.json();
}

export async function createCategoryApi(categoryData) {
  const res = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(categoryData),
  });
  if (!res.ok) throw new Error('Error al crear categoría');
  return res.json();
}

export async function updateCategoryApi(id, categoryData) {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(categoryData),
  });
  if (!res.ok) throw new Error('Error al actualizar categoría');
  return res.json();
}

export async function deleteCategoryApi(id) {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar categoría');
  return res.json();
}