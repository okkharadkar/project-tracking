export interface Project {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed';
  assignedTo?: {
    _id: string;
    name: string;
    email: string;
  };
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  completedAt?: Date;
  acceptedAt?: Date;
  progress?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Progress {
  project: Project;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed';
  _id?: string;
}

export interface Candidate {
  _id: string;
  name: string;
  email: string;
  progress: Progress[];
  score: number;
} 