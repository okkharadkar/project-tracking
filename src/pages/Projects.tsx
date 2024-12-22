import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Project } from '../types';
import ProjectDetails from '../components/ProjectDetails';

type SortOption = 'all' | 'pending' | 'in-progress' | 'completed';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('all');
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(response.data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => {
    if (sortBy === 'all') return true;
    return project.status === sortBy;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Available Projects</h1>
        <select 
          className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          onChange={(e) => setSortBy(e.target.value as SortOption)}
        >
          <option value="all">All Projects</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer hover:bg-gray-750"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <div className="mt-4 space-y-3">
                {project.assignedTo && (
                  <div className="flex items-center justify-end">
                    <span className="text-sm text-gray-400">
                      Assigned to: {project.assignedTo.name}
                    </span>
                  </div>
                )}
                
                {project.progress !== undefined && (
                  <div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs text-gray-400">{project.progress}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
} 