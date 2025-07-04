// Expenses API
const API_URL = '/api/expenses';

export const fetchExpenses = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch expenses');
  return res.json();
};

export const fetchExpenseById = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch expense');
  return res.json();
};

export const createExpense = async (expense: any) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error('Failed to create expense');
  return res.json();
};

export const updateExpense = async (id: number, expense: any) => {
  // Ensure date is in yyyy-MM-dd format for the API
  const fixedExpense = {
    ...expense,
    date: expense.date ? expense.date.slice(0, 10) : '',
  };
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fixedExpense),
  });
  if (!res.ok) throw new Error('Failed to update expense');
  // 204 No Content: don't parse JSON
  if (res.status === 204) return true;
  return res.json();
};

export const deleteExpense = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete expense');
  return res.ok;
};
