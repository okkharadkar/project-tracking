import { useEffect, useState } from 'react';
import axios from 'axios';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useAuth } from '../context/AuthContext';

interface ProjectSummary {
  pending: number;
  assigned: number;
  'in-progress': number;
  completed: number;
  total: number;
}

const COLORS = {
  pending: '#fbbf24',    // Amber
  'in-progress': '#a78bfa', // Purple
  completed: '#10b981'   // Green
};

export default function ProjectSummaryGraphs() {
  const [summary, setSummary] = useState<ProjectSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchSummary();

    // Listen for refresh events
    const handleRefresh = () => {
      fetchSummary();
    };

    window.addEventListener('refreshProjectSummary', handleRefresh);

    return () => {
      window.removeEventListener('refreshProjectSummary', handleRefresh);
    };
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/projects/summary`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Log received data for debugging
      console.log('Received project summary:', response.data);
      
      setSummary(response.data);
    } catch (error) {
      console.error('Failed to fetch project summary:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (summary) {
      console.log('Current project counts:', {
        pending: summary.pending,
        inProgress: summary['in-progress'],
        completed: summary.completed,
        total: summary.total
      });
    }
  }, [summary]);

  if (loading || !summary) {
    return <div>Loading...</div>;
  }

  const pieData = [
    { name: 'Pending', value: summary.pending },
    { name: 'In Progress', value: summary['in-progress'] },
    { name: 'Completed', value: summary.completed }
  ];

  const barData = [
    { name: 'Pending', value: summary.pending, color: COLORS.pending },
    { name: 'In Progress', value: summary['in-progress'], color: COLORS['in-progress'] },
    { name: 'Completed', value: summary.completed, color: COLORS.completed }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <div className="bg-gray-900 rounded-lg p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-4">Project Distribution</h2>
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
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.name.toLowerCase().replace(' ', '-') as keyof typeof COLORS]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-900 rounded-lg p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-4">Project Status</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="value">
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 