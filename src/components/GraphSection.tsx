import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

interface GraphSectionProps {
  projectStats: {
    completed: number;
    inProgress: number;
    pending: number;
  };
}

export default function GraphSection({ projectStats }: GraphSectionProps) {
  const pieData = [
    { name: 'Completed', value: projectStats.completed },
    { name: 'In Progress', value: projectStats.inProgress },
    { name: 'Pending', value: projectStats.pending }
  ];

  const barData = [
    { name: 'Completed', value: projectStats.completed },
    { name: 'In Progress', value: projectStats.inProgress },
    { name: 'Pending', value: projectStats.pending }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Project Status Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Project Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0284c7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 