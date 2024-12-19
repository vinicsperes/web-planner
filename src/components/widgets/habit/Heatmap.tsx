import { Habit, colorVariants, getLastNDays } from "@/utils/habitData";

interface HeatmapProps {
    habit: Habit
    type: 'year' | 'month'
}

const getSquareClasses = (completedCount: number, goal: number, color: string) => {
    const progressLevel = completedCount / goal;
    const squareColor = progressLevel !== 0 ? colorVariants[color][500] : 'bg-gray-800'
    const opacityClass = progressLevel >= 1
        ? "opacity-100"
        : progressLevel >= 0.75
            ? "opacity-50"
            : progressLevel > 0
                ? "opacity-25"
                : "";

    return `${squareColor} ${opacityClass}`
};

const HeatmapCell = ({ date, completedCount, goal, squareSize, color }: {
    date: string,
    completedCount: number,
    goal: number,
    squareSize: string,
    color: string
}) => {
    const squareClasses = getSquareClasses(completedCount, goal, color)

    return (
        <div key={date} className="group relative max-w-4">
            <div className={`${squareSize} ${squareClasses}`} />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
                {`${date}: ${completedCount}/${goal} done`}
            </div>
        </div>
    )
}

export function Heatmap({ habit, type }: HeatmapProps) {
    const days = type === 'year' ? getLastNDays(365) : getLastNDays(30)
    const squareSize = type === 'year' ? 'w-2 h-2 rounded-[1px]' : 'w-4 h-4 rounded-[2px]'

    const firstSundayIndex = days.findIndex(
        (day) => new Date(day).getDay() === 0
    );
    const adjustedDays = firstSundayIndex >= 0 ? days.slice(firstSundayIndex) : days

    const weeks = Array.from({ length: Math.ceil(adjustedDays.length / 7) }, (_, i) =>
        adjustedDays.slice(i * 7, i * 7 + 7)
    );

    const renderYearHeatmap = () => (
        <div
            className="grid gap-[3px] mb-4"
            style={{
                gridTemplateColumns: `repeat(${weeks.length}, 1fr)`,
                gridTemplateRows: `repeat(7, 1fr)`,
            }}
        >
            {Array.from({ length: 7 }).map((_, rowIndex) =>
                weeks.map((week, colIndex) => {
                    const date = week[rowIndex];
                    if (!date) return <div key={`${rowIndex}-${colIndex}`} />

                    const completedCount = habit.completedDates[date] || 0
                    return (
                        <HeatmapCell
                            key={`${rowIndex}-${colIndex}`}
                            date={date}
                            completedCount={completedCount}
                            goal={habit.goal}
                            squareSize={squareSize}
                            color={habit.color}
                        />
                    )
                })
            )}
        </div>
    )

    const renderMonthHeatmap = () => (
        <div className="grid grid-cols-7 gap-y-1 justify-between place-items-center">
            {days.map((date) => {
                const completedCount = habit.completedDates[date] || 0;
                return (
                    <HeatmapCell
                        key={date}
                        date={date}
                        completedCount={completedCount}
                        goal={habit.goal}
                        squareSize={squareSize}
                        color={habit.color}
                    />
                )
            })}
        </div>
    )

    return (
        <>
            {type === 'year' ? renderYearHeatmap() : renderMonthHeatmap()}
        </>
    )
}
