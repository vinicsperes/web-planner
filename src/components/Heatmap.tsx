import { getLastNDays, Habit } from "../utils/habitData";

interface HeatmapProps {
    habits: Habit[];
}

export function Heatmap({ habits }: HeatmapProps) {
    const lastNDays = getLastNDays(30); // Show last 30 days

    return (
        <div className="grid grid-cols-7 w-32 gap-1">
            {lastNDays.map((date) => {
                const completedCount = habits.filter(habit =>
                    habit.completedDates.has(date)
                ).length;

                return (
                    <div
                        key={date}
                        className={`w-4 h-4 rounded-sm ${completedCount > 0 ? 'bg-green-500' : 'bg-gray-500'}`}
                        title={`${date}: ${completedCount}/${habits.length} habits completed`}
                    />
                );
            })}
        </div>
    );
}
