import { useState } from 'react';
import ProgressBar from './ProgressBar';
import { Candidate } from '../types';

interface CandidateCardProps {
  candidate: Candidate;
  onEdit: (candidate: Candidate) => void;
}

export default function CandidateCard({ candidate, onEdit }: CandidateCardProps) {
  const progressPercentage = (candidate.progress.filter(p => p.status === 'completed').length / 
    Math.max(candidate.progress.length, 1)) * 100;

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{candidate.name}</h3>
          <p className="text-gray-600">{candidate.email}</p>
        </div>
        <button
          onClick={() => onEdit(candidate)}
          className="text-primary-600 hover:text-primary-700"
        >
          Edit Progress
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <ProgressBar progress={progressPercentage} />
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Projects: {candidate.progress.length}
        </div>
        <div className="text-lg font-semibold text-primary-600">
          Score: {candidate.score}
        </div>
      </div>
    </div>
  );
} 