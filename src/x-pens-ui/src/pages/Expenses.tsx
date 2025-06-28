import { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

export default function Expenses() {
  const [editing, setEditing] = useState<any | null>(null);
  const [refresh, setRefresh] = useState(0);

  const handleSaved = () => {
    setEditing(null);
    setRefresh(r => r + 1);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Expenses</h2>
      <ExpenseForm onSaved={handleSaved} editing={editing} />
      <ExpenseTable key={refresh} onEdit={setEditing} />
    </div>
  );
}
