import { Habit, colorVariants, getLastNDays } from "@/utils/habitData";

interface HeatmapProps {
    habit: Habit
    type: 'year' | 'month'
}

export function Heatmap({ habit, type }: HeatmapProps) {
    const days = type === 'year' ? getLastNDays(365) : getLastNDays(30);
    const squareSize = type === 'year' ? 'w-2 h-2 rounded-[1px]' : 'w-4 h-4 rounded-[2px]'

    const firstSundayIndex = days.findIndex(
        (day) => new Date(day).getDay() === 0
    );
    const adjustedDays = firstSundayIndex >= 0 ? days.slice(firstSundayIndex) : days;

    // Organiza os dias por semana: cada coluna terá 7 dias
    const weeks = Array.from({ length: Math.ceil(adjustedDays.length / 7) }, (_, i) =>
        adjustedDays.slice(i * 7, i * 7 + 7)
    );

    return (
        <div
            className="grid gap-[3px] mb-4"
            style={{
                gridTemplateColumns: `repeat(${weeks.length}, 1fr)`, // Colunas = quantidade de semanas
                gridTemplateRows: `repeat(7, 1fr)`, // Linhas = dias da semana
            }}
        >
            {Array.from({ length: 7 }).map((_, rowIndex) => (
                weeks.map((week, colIndex) => {
                    const date = week[rowIndex]; // Dia da semana específico na coluna atual
                    if (!date) return <div key={`${rowIndex}-${colIndex}`} />; // Espaço vazio para colunas incompletas

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
                        <div key={`${rowIndex}-${colIndex}`} className="group relative">
                            <div
                                className={`${squareSize} ${squareColor} ${opacityClass}`}
                            />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
                                {`${date}: ${completedCount}/${habit.goal} done`}
                            </div>
                        </div>
                    );
                })
            ))}
        </div>
    );
}
