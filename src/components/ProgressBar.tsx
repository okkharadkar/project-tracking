interface ProgressBarProps {
  progress: number;
  color?: string;
}

export default function ProgressBar({ progress, color = 'primary' }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={`bg-${color}-600 h-2.5 rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
} 