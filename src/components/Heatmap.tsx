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
                    <div key={date} className="group relative">
                        <div
                            className={`w-4 h-4 rounded-sm ${squareColor} ${opacityClass}`}
                        />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
                            {`${date}: ${completedCount}/${habit.goal} done`}
                        </div>
                    </div>
                )

            })}
        </div>
    )
}
