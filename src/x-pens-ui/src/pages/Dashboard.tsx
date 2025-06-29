import { useEffect, useState } from 'react';
import StatsOverview from '../components/StatsOverview';
import ExpensesByCategoryChart from '../components/ExpensesByCategoryChart';
import { fetchExpenses } from '../api/expenses';
import { fetchCategories } from '../api/categories';

export default function Dashboard() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    Promise.all([fetchExpenses(), fetchCategories()])
      .then(([expensesData, categoriesData]) => {
        // Join category names to expenses
        const catMap = Object.fromEntries(categoriesData.map((c: any) => [c.id, c.name]));
        const withNames = expensesData.map((e: any) => ({
          ...e,
          categoryName: e.categoryName || catMap[e.categoryId] || `Category ${e.categoryId}`,
        }));
        setExpenses(withNames);
        setError(null);
      })
      .catch(err => setError(err.message || 'Failed to load expenses'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="flex gap-4 mb-4">
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
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <svg className="animate-spin h-6 w-6 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <StatsOverview expenses={expenses.filter(e => (!dateFrom || e.date >= dateFrom) && (!dateTo || e.date <= dateTo))} />
          <ExpensesByCategoryChart expenses={expenses.filter(e => (!dateFrom || e.date >= dateFrom) && (!dateTo || e.date <= dateTo))} />
        </>
      )}
    </div>
  );
}
