import { useEffect, useState } from 'react';
import { Project } from '../types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ProgressTrackerProps {
  progress: Project[];
  totalScore: number;
  completionRate: number;
}

export default function ProgressTracker({ progress, totalScore, completionRate }: ProgressTrackerProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(completionRate);
    }, 100);
    return () => clearTimeout(timer);
  }, [completionRate]);

  const totalProjects = progress.length;
  const completedCount = progress.filter(p => p.status === 'completed').length;
  const inProgressCount = progress.filter(p => p.status === 'in-progress').length;
  const pendingCount = progress.filter(p => p.status === 'pending').length;

  const getPercentage = (count: number) => {
    return totalProjects === 0 ? 0 : Math.round((count / totalProjects) * 100);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Progress Overview</h3>
        <div className="text-green-500	">
          Score: {totalScore} points
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="w-32 h-32 mx-auto">
          <CircularProgressbar
            value={animatedProgress}
            text={`${Math.round(animatedProgress)}%`}
            styles={buildStyles({
              pathColor: `rgba(62, 152, 199, ${animatedProgress / 100})`,
              textColor: '#fff',
              trailColor: '#2d3748',
              textSize: '16px'
            })}
          />
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Completed</span>
              <span>{completedCount} ({getPercentage(completedCount)}%)</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getPercentage(completedCount)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>In Progress</span>
              <span>{inProgressCount} ({getPercentage(inProgressCount)}%)</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getPercentage(inProgressCount)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Pending</span>
              <span>{pendingCount} ({getPercentage(pendingCount)}%)</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gray-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getPercentage(pendingCount)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 