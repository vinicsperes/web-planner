import { getLastNDays, formatDate, getOpacity, Habit } from '../utils/habitData'

interface HeatmapProps {
  habit?: Habit;
  habits?: Habit[];
}

export function Heatmap({ habit, habits }: HeatmapProps) {
  const lastNDays = getLastNDays(30); // Show last 30 days

  return (
    <div className="grid grid-cols-7 w-32 gap-1">
      {lastNDays.map((date) => {
        const formattedDate = formatDate(date);
        if (habit) {
          const isCompleted = habit.completedDates.includes(formattedDate);
          return (
            <div
              key={formattedDate}
              className={`w-4 h-4 rounded-sm ${
                isCompleted ? habit.color : 'bg-zinc-700'
              }`}
              title={`${formattedDate}: ${isCompleted ? 'Completed' : 'Not completed'}`}
            />
          );
        } else if (habits) {
          const completedCount = habits.filter(h => h.completedDates.includes(formattedDate)).length;
          const allCompleted = completedCount === habits.length;
          return (
            <div
              key={formattedDate}
              className={`w-4 h-4 rounded-sm ${
                allCompleted ? 'bg-purple-500' : 'bg-gray-500'
              } ${getOpacity(completedCount, habits.length)}`}
              title={`${formattedDate}: ${completedCount}/${habits.length} habits completed`}
            />
          );
        }
        return null;
      })}
    </div>
  );
}


