import { useState, useEffect } from 'react';
import { fetchCategories } from '../api/categories';

export default function CategorySelect({ value, onChange }: { value: number; onChange: (id: number) => void }) {
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);
  return (
    <select
      className="border rounded px-2 py-1"
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      required
    >
      <option value="">Select category</option>
      {categories.map(cat => (
        <option key={cat.id} value={cat.id}>{cat.name}</option>
      ))}
    </select>
  );
}
