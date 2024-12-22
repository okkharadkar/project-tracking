import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Candidate, Progress } from '../types';

interface EditProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate | null;
  onUpdateProgress: (projectId: string, status: 'in-progress' | 'completed') => Promise<void>;
}

export default function EditProgressModal({ 
  isOpen, 
  onClose, 
  candidate, 
  onUpdateProgress 
}: EditProgressModalProps) {
  if (!candidate) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center">
                  {candidate.name}'s Progress
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </Dialog.Title>

                <div className="mt-4 space-y-4">
                  {candidate.progress.map((item) => (
                    <div key={item.project._id} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{item.project.title}</h4>
                        <p className="text-sm text-gray-500">{item.project.description}</p>
                      </div>
                      <select
                        value={item.status}
                        onChange={(e) => onUpdateProgress(item.project._id, e.target.value as 'in-progress' | 'completed')}
                        className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-right">
                  <button
                    onClick={onClose}
                    className="btn btn-primary"
                  >
                    Done
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 