import { Habit, colorVariants, getLastNDays } from "@/utils/habitData";

interface HeatmapProps {
    habit: Habit;
    type: 'year' | 'month';
}

export function Heatmap({ habit, type }: HeatmapProps) {
    const days = type === 'year' ? getLastNDays(365) : getLastNDays(30);
    const squareSize = type === 'year' ? 'w-2 h-2 rounded-[1px]' : 'w-4 h-4 rounded-[2px]';

    return (
        <div
            className="grid grid-cols-7 gap-[3px] mb-4"
        >
            {days.map((date) => {
                const completedCount = habit.completedDates[date] || 0;
                const progressLevel = completedCount / habit.goal;

                const squareColor =
                    progressLevel !== 0
                        ? colorVariants[habit.color][500]
                        : 'bg-gray-800';
                const opacityClass =
                    progressLevel >= 1
                        ? "opacity-100"
                        : progressLevel >= 0.75
                        ? "opacity-50"
                        : progressLevel > 0
                        ? "opacity-25"
                        : "";

                return (
                    <div key={date} className="group relative">
                        <div className={`${squareSize} ${squareColor} ${opacityClass}`} />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
                            {`${date}: ${completedCount}/${habit.goal} done`}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
