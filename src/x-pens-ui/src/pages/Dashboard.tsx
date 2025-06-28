import { useEffect, useState } from 'react';
import StatsOverview from '../components/StatsOverview';
import ExpensesByCategoryChart from '../components/ExpensesByCategoryChart';
import { fetchExpenses } from '../api/expenses';
import { fetchCategories } from '../api/categories';

export default function Dashboard() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <StatsOverview expenses={expenses} />
          <ExpensesByCategoryChart expenses={expenses} />
        </>
      )}
    </div>
  );
}
