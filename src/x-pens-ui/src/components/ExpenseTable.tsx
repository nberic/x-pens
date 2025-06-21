import { useEffect, useState } from 'react';
import { fetchExpenses, deleteExpense } from '../api/expenses';

export default function ExpenseTable({ onEdit }: { onEdit: (expense: any) => void }) {
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

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this expense?')) return;
    await deleteExpense(id);
    loadExpenses();
  };

  if (loading) return <div>Loading expenses...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
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
        {expenses.map((exp) => (
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
  );
}
