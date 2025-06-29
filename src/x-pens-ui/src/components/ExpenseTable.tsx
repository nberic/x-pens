import { useEffect, useState } from 'react';
import { fetchExpenses, deleteExpense } from '../api/expenses';

interface ExpenseTableProps {
  onEdit: (expense: any) => void;
  filterCategoryId?: number | '';
  filterDateFrom?: string;
  filterDateTo?: string;
}

export default function ExpenseTable({ onEdit, filterCategoryId, filterDateFrom, filterDateTo }: ExpenseTableProps) {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadExpenses = async () => {
    setLoading(true);
    try {
      const data = await fetchExpenses();
      setExpenses(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // Filtering logic
  const filtered = expenses.filter(exp => {
    let ok = true;
    if (filterCategoryId && exp.categoryId !== filterCategoryId) ok = false;
    if (filterDateFrom && exp.date < filterDateFrom) ok = false;
    if (filterDateTo && exp.date > filterDateTo) ok = false;
    return ok;
  });

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this expense?')) return;
    await deleteExpense(id);
    loadExpenses();
  };

  if (loading) return (
    <div className="flex justify-center items-center py-8">
      <svg className="animate-spin h-6 w-6 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
      <span>Loading expenses...</span>
    </div>
  );
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  // Summary for filtered
  const total = filtered.reduce((sum, e) => sum + Number(e.amount), 0);

  if (!filtered.length) {
    return (
      <div className="flex flex-col items-center py-12">
        <svg className="h-12 w-12 text-gray-300 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2m-4-4v4m0 0v4m0-4H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-7z" />
        </svg>
        <div className="text-gray-500">No expenses found for the selected criteria.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 text-right text-blue-700 font-semibold">
        Total: ${total.toFixed(2)}
      </div>
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Note</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((exp) => (
            <tr key={exp.id} className="border-t">
              <td className="px-4 py-2">${exp.amount.toFixed(2)}</td>
              <td className="px-4 py-2">{new Date(exp.date).toLocaleDateString()}</td>
              <td className="px-4 py-2">{exp.categoryName || exp.categoryId}</td>
              <td className="px-4 py-2">{exp.note}</td>
              <td className="px-4 py-2 flex gap-2">
                <button className="text-blue-600" onClick={() => onEdit(exp)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(exp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
