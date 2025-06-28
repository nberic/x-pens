import { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import { fetchCategories } from '../api/categories';

export default function Expenses() {
  const [editing, setEditing] = useState<any | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const handleSaved = () => {
    setEditing(null);
    setRefresh(r => r + 1);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Expenses</h2>
      <ExpenseForm onSaved={handleSaved} editing={editing} />
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Category</label>
          <select
            className="border rounded px-2 py-1"
            value={categoryId}
            onChange={e => setCategoryId(e.target.value ? Number(e.target.value) : '')}
          >
            <option value="">All</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">From</label>
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">To</label>
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
          />
        </div>
      </div>
      <ExpenseTable
        key={refresh}
        onEdit={setEditing}
        filterCategoryId={categoryId}
        filterDateFrom={dateFrom}
        filterDateTo={dateTo}
      />
    </div>
  );
}
