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
                
                const squareColor = progressLevel != 0 ? colorVariants[habit.color][500] : 'bg-gray-800'
                const opacityClass = progressLevel >= 1
                    ? "opacity-100"
                    : progressLevel >= 0.75
                        ? "opacity-50"
                        : progressLevel > 0
                            ? "opacity-25"
                            : null

                return (
                    <div
                        key={date}
                        className={`w-4 h-4 rounded-sm ${squareColor} ${opacityClass}`}
                        title={`${date}: ${completedCount}/${habit} habits completed`}
                    />
                )
            })}
        </div>
    )
}
