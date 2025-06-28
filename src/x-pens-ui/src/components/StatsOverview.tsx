interface Expense {
  id: number;
  amount: number;
  date: string;
  categoryId: number;
  note?: string;
}

interface StatsOverviewProps {
  expenses: Expense[];
}

// StatsOverview component
export default function StatsOverview({ expenses }: StatsOverviewProps) {
  // Calculate total spent
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  // Get recent expenses (last 5)
  const recent = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Total Spent</h2>
        <div className="text-2xl font-bold text-blue-700">${total.toFixed(2)}</div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Recent Expenses</h2>
        <ul className="divide-y">
          {recent.length === 0 && <li className="text-gray-500">No expenses yet.</li>}
          {recent.map(e => (
            <li key={e.id} className="py-2 flex justify-between">
              <span>{e.note || 'No note'}</span>
              <span className="font-mono">${Number(e.amount).toFixed(2)}</span>
              <span className="text-gray-500 text-sm">{e.date.slice(0, 10)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
