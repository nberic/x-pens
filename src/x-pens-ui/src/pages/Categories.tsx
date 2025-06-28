import { useEffect, useState } from 'react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../api/categories';

interface Category {
  id?: number;
  name: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<Category>({ name: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      setCategories(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || form.name.trim().length < 2) return 'Category name must be at least 2 characters.';
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
      if (editingId) {
        await updateCategory(editingId, form);
        setSuccess('Category updated successfully!');
      } else {
        await createCategory(form);
        setSuccess('Category added successfully!');
      }
      setForm({ name: '' });
      setEditingId(null);
      loadCategories();
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    }
    setLoading(false);
  };

  const handleEdit = (cat: Category) => {
    setForm({ name: cat.name });
    setEditingId(cat.id!);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this category?')) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await deleteCategory(id);
      setSuccess('Category deleted successfully!');
      loadCategories();
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-2 py-1 flex-1"
          placeholder="Category name"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {editingId ? 'Update' : 'Add'}
        </button>
        {editingId && (
          <button
            type="button"
            className="ml-2 text-gray-600 underline"
            onClick={() => { setForm({ name: '' }); setEditingId(null); setError(null); setSuccess(null); }}
          >
            Cancel
          </button>
        )}
      </form>
      {error && <div className="text-red-500 bg-red-100 border border-red-300 rounded px-2 py-1 mb-2">{error}</div>}
      {success && <div className="text-green-600 bg-green-100 border border-green-300 rounded px-2 py-1 mb-2">{success}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id} className="border-t">
                <td className="px-4 py-2">{cat.name}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="text-blue-600" onClick={() => handleEdit(cat)}>Edit</button>
                  <button className="text-red-600" onClick={() => handleDelete(cat.id!)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
