import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Project } from '../types';
import AdminProjectDetails from '../components/AdminProjectDetails';
import { Navigate } from 'react-router-dom';

export default function ManageProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { token, user } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/projects`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setProjects(response.data);
    } catch (error: any) {
      console.error('Fetch error:', error.response?.data);
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await axios.delete(`${API_URL}/api/projects/${projectId}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error: any) {
      console.error('Delete error:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to delete project');
    }
  };

  // Only render if user is admin
  if (user?.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Manage Projects</h1>
      </div>
      
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer hover:bg-gray-750"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProject(project._id);
                  }}
                  className="text-red-500 hover:text-red-400"
                >
                  Delete
                </button>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {project.status}
                  </span>
                  {project.assignedTo && (
                    <span className="text-sm text-gray-400">
                      {project.assignedTo.name}
                    </span>
                  )}
                </div>
                
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
        <AdminProjectDetails
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          onDelete={handleDeleteProject}
        />
      )}
    </div>
  );
} 