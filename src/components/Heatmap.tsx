import { getLastNDays, Habit, colorVariants } from "../utils/habitData";

interface HeatmapProps {
    habits: Habit[]
    color: string
}

export function Heatmap({ habits, color }: HeatmapProps) {
    const lastNDays = getLastNDays(30)
    const completeColor = colorVariants[color]?.[400] ?? 'bg-green-500'

    return (
        <div className="grid grid-cols-7 w-32 gap-1">
            {lastNDays.map((date) => {
                const completedCount = habits.filter(habit =>
                    habit.completedDates.has(date)
                ).length

                return (
                    <div
                        key={date}
                        className={`w-4 h-4 rounded-sm ${completedCount > 0 ? completeColor : 'bg-gray-500'}`}
                        title={`${date}: ${completedCount}/${habits.length} habits completed`}
                    />
                )
            })}
        </div>
    )
}
