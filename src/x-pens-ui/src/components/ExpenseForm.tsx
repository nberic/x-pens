import { useState, useEffect } from 'react';
import { createExpense, updateExpense } from '../api/expenses';
import CategorySelect from './CategorySelect';

const initialForm = { amount: '', date: '', categoryId: 0, note: '' };

export default function ExpenseForm({ onSaved, editing }: { onSaved: () => void; editing?: any }) {
  const [form, setForm] = useState(editing || initialForm);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Update form when editing changes
  useEffect(() => {
    // If editing, ensure date is in yyyy-MM-dd format for input
    if (editing && editing.date) {
      setForm({
        ...editing,
        date: editing.date.slice(0, 10),
      });
    } else {
      setForm(initialForm);
    }
  }, [editing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategory = (id: number) => setForm({ ...form, categoryId: id });

  const validate = () => {
    if (!form.amount || Number(form.amount) <= 0) return 'Amount must be greater than 0.';
    if (!form.date) return 'Date is required.';
    if (!form.categoryId || form.categoryId === 0) return 'Please select a category.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      if (form.id) {
        await updateExpense(form.id, form);
        setSuccess('Expense updated successfully!');
      } else {
        await createExpense(form);
        setSuccess('Expense added successfully!');
      }
      setForm(initialForm);
      onSaved();
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
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
      {error && <div className="text-red-500 bg-red-100 border border-red-300 rounded px-2 py-1 mb-2">{error}</div>}
      {success && <div className="text-green-600 bg-green-100 border border-green-300 rounded px-2 py-1 mb-2">{success}</div>}
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
