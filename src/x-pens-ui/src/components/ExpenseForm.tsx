import { useState, useEffect } from 'react';
import { createExpense, updateExpense } from '../api/expenses';
import CategorySelect from './CategorySelect';

const initialForm = { amount: '', date: '', categoryId: 0, note: '' };

export default function ExpenseForm({ onSaved, editing }: { onSaved: () => void; editing?: any }) {
  const [form, setForm] = useState(editing || initialForm);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Update form when editing changes
  useEffect(() => {
    setForm(editing || initialForm);
  }, [editing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategory = (id: number) => setForm({ ...form, categoryId: id });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (form.id) {
        await updateExpense(form.id, form);
      } else {
        await createExpense(form);
      }
      setForm(initialForm);
      onSaved();
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4 flex flex-col gap-3">
      <div>
        <label className="block mb-1">Amount</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Category</label>
        <CategorySelect value={form.categoryId} onChange={handleCategory} />
      </div>
      <div>
        <label className="block mb-1">Note</label>
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {form.id ? 'Update' : 'Add'} Expense
      </button>
    </form>
  );
}
