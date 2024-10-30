
interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="w-full bg-[#DADAFF] rounded-lg">
      <div
        className="bg-[#253C98] h-5 rounded-lg transition-all duration-300"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

