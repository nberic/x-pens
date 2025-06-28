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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (editingId) {
        await updateCategory(editingId, form);
      } else {
        await createCategory(form);
      }
      setForm({ name: '' });
      setEditingId(null);
      loadCategories();
    } catch (err: any) {
      setError(err.message);
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
    try {
      await deleteCategory(id);
      loadCategories();
    } catch (err: any) {
      setError(err.message);
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
            onClick={() => { setForm({ name: '' }); setEditingId(null); }}
          >
            Cancel
          </button>
        )}
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
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
