import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Project } from '../types';

export default function Progress() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [availableProjects, setAvailableProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUserProjects();
  }, []);

  const fetchUserProjects = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/projects/user`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setProjects(response.data.myProjects);
      setAvailableProjects(response.data.availableProjects);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptProject = async (projectId: string) => {
    try {
      await axios.put(
        `${API_URL}/api/projects/${projectId}/accept`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success('Project accepted');
      fetchUserProjects();
    } catch (error) {
      toast.error('Failed to accept project');
    }
  };

  const handleCompleteProject = async (projectId: string) => {
    try {
      await axios.put(
        `${API_URL}/api/projects/${projectId}/complete`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success('Project completed');
      fetchUserProjects();
    } catch (error) {
      toast.error('Failed to complete project');
    }
  };

  const handleUpdateProgress = async (projectId: string, progress: number) => {
    try {
      await axios.put(
        `${API_URL}/api/projects/${projectId}`,
        { progress },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success('Progress updated');
      fetchUserProjects();
    } catch (error) {
      toast.error('Failed to update progress');
    }
  };

  const pendingProjects = projects.filter(p => p.status === 'pending');
  const inProgressProjects = projects.filter(p => p.status === 'in-progress');
  const completedProjects = projects.filter(p => p.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Available Projects - Moved to top */}
      {availableProjects.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Available Projects</h2>
          <div className="space-y-4">
            {availableProjects.map((project) => (
              <div key={project._id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                  <button
                    onClick={() => handleAcceptProject(project._id)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Accept Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* In Progress Projects */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">In Progress</h2>
        {loading ? (
          <div>Loading...</div>
        ) : inProgressProjects.length > 0 ? (
          <div className="space-y-4">
            {inProgressProjects.map((project) => (
              <div key={project._id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.description}</p>
                    {project.acceptedAt && (
                      <p className="text-sm text-gray-500">
                        Started: {new Date(project.acceptedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleCompleteProject(project._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Mark Complete
                  </button>
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={project.progress}
                      onChange={(e) => handleUpdateProgress(project._id, Number(e.target.value))}
                      className="w-20 rounded-md border-gray-300"
                    />
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No projects in progress</p>
        )}
      </div>

      {/* Completed Projects */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Completed</h2>
        {loading ? (
          <div>Loading...</div>
        ) : completedProjects.length > 0 ? (
          <div className="space-y-4">
            {completedProjects.map((project) => (
              <div key={project._id} className="border rounded-lg p-4">
                <h3 className="font-medium">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
                {project.completedAt && (
                  <p className="text-sm text-gray-500">
                    Completed: {new Date(project.completedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No completed projects</p>
        )}
      </div>
    </div>
  );
} 