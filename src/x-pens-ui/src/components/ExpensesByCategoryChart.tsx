import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Expense {
  id: number;
  amount: number;
  date: string;
  categoryId: number;
  categoryName?: string;
  note?: string;
}

interface ExpensesByCategoryChartProps {
  expenses: Expense[];
}

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c', '#d0ed57', '#d8854f',
];

export default function ExpensesByCategoryChart({ expenses }: ExpensesByCategoryChartProps) {
  // Group expenses by category
  const data = Object.values(
    expenses.reduce((acc, exp) => {
      const key = exp.categoryName || `Category ${exp.categoryId}`;
      acc[key] = acc[key] || { name: key, value: 0 };
      acc[key].value += Number(exp.amount);
      return acc;
    }, {} as Record<string, { name: string; value: number }>)
  );

  if (data.length === 0) return <div className="text-gray-500">No data to display.</div>;

  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
