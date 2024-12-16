import { getLastNDays, Habit, colorVariants } from "../utils/habitData";

interface HeatmapProps {
    habit: Habit
    color: string
}

export function Heatmap({ habit }: HeatmapProps) {
    const lastNDays = getLastNDays(30)

    return (
        <div className="grid grid-cols-7 w-32 gap-1">
            {lastNDays.map((date) => {
                const completedCount = habit.completedDates[date] || 0
                const progressLevel = completedCount / habit.goal;

                let squareColor = "bg-gray-500"; 
                if (progressLevel >= 1) {
                    squareColor = colorVariants[habit.color][500]
                } else if (progressLevel >= 0.75) {
                    squareColor = colorVariants[habit.color][600]
                } else if (progressLevel > 0) {
                    squareColor = colorVariants[habit.color][700]
                }

                return (
                    <div
                        key={date}
                        className={`w-4 h-4 rounded-sm ${squareColor}`}
                        title={`${date}: ${completedCount}/${habit} habits completed`}
                    />
                )
            })}
        </div>
    )
}
