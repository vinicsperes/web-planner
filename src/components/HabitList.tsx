import { Habit } from '../utils/habitData'
import { Heatmap } from './Heatmap'

interface HabitListProps {
  habits: Habit[];
  onUpdateHabitProgress: (habitId: string, progress: number) => void;
}

export function HabitList({ habits, onUpdateHabitProgress }: HabitListProps) {
  const today = new Date().toISOString().split('T')[0];

  const handleIncrement = (habitId: string, currentProgress: number, goal: number) => {
    const newProgress = currentProgress + 1;
    if (newProgress > goal) {
      onUpdateHabitProgress(habitId, 0); // Reset progress if goal is exceeded
    } else {
      onUpdateHabitProgress(habitId, newProgress);
    }
  };

  return (
    <div className="space-y-6">
      {habits.map((habit) => {
        const todayProgress = habit.completedDates.filter((date) => date === today).length;
        return (
          <div key={habit._id} className="space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleIncrement(habit._id, todayProgress, habit.goal)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${todayProgress === habit.goal ? 'bg-green-500' : 'bg-blue-500'} text-white`}
              >
                {todayProgress === habit.goal ? '✔️' : todayProgress}
              </button>
              <span>{habit.name}</span>
            </div>
            <Heatmap habits={habits} />
          </div>
        );
      })}
    </div>
  );
}
