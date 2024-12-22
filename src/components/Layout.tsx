import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-4">
              {isAdmin ? (
                <>
                  <Link to="/admin" className="flex items-center px-2 py-2 text-gray-300 hover:text-white">
                    Dashboard
                  </Link>
                  <Link to="/admin/projects" className="flex items-center px-2 py-2 text-gray-300 hover:text-white">
                    Manage Projects
                  </Link>
                  <Link to="/admin/create-project" className="flex items-center px-2 py-2 text-gray-300 hover:text-white">
                    Create Project
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" className="flex items-center px-2 py-2 text-gray-300 hover:text-white">
                    Dashboard
                  </Link>
                  <Link to="/projects" className="flex items-center px-2 py-2 text-gray-300 hover:text-white">
                    Projects
                  </Link>
                  <Link to="/progress" className="flex items-center px-2 py-2 text-gray-300 hover:text-white">
                    Progress
                  </Link>
                </>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">
                Welcome, {user?.name} ({isAdmin ? 'Admin' : 'User'})
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-600">
          Project Management System © 2024
        </div>
      </footer>
      
      <Toaster position="top-right" />
    </div>
  );
} 