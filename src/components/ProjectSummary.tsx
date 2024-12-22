import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface ProjectSummaryProps {
  summary: {
    pending: number;
    assigned: number;
    completed: number;
  };
}

const COLORS = ['#fbbf24', '#3b82f6', '#10b981'];

export default function ProjectSummary({ summary }: ProjectSummaryProps) {
  const data = [
    { name: 'Pending', value: summary.pending },
    { name: 'Assigned', value: summary.assigned },
    { name: 'Completed', value: summary.completed }
  ];

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4">Project Status Overview</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 