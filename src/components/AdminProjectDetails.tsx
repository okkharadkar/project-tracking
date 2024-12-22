import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { Project } from '../types';

interface AdminProjectDetailsProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminProjectDetails({ project, isOpen, onClose }: AdminProjectDetailsProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
          <div className="flex justify-between items-start mb-6">
            <Dialog.Title as="h3" className="text-xl font-semibold text-white">
              {project.title}
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Description</h4>
              <p className="text-gray-200">{project.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400">Status</h4>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-600/50 text-gray-300'
                }`}>
                  {project.status}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400">Progress</h4>
                <div className="mt-2">
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress || 0}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-300 mt-1">
                    {project.progress || 0}% Complete
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400">Created Date</h4>
                <p className="mt-1 text-gray-200">
                  {format(new Date(project.createdAt), 'PPP')}
                </p>
              </div>

              {project.assignedTo && (
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Assigned To</h4>
                  <p className="mt-1 text-gray-200">{project.assignedTo.name}</p>
                  <p className="text-sm text-gray-400">{project.assignedTo.email}</p>
                </div>
              )}
            </div>

            {project.acceptedAt && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Started Date</h4>
                  <p className="mt-1 text-gray-200">
                    {format(new Date(project.acceptedAt), 'PPP')}
                  </p>
                </div>

                {project.completedAt && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">Completed Date</h4>
                    <p className="mt-1 text-gray-200">
                      {format(new Date(project.completedAt), 'PPP')}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 