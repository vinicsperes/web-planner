import { Habit } from '../utils/habitData'
import { Heatmap } from './Heatmap'

interface HabitListProps {
    habits: Habit[];
    onUpdateHabitProgress: (habitId: string, progress: number) => void;
}

export function HabitList({ habits, onUpdateHabitProgress }: HabitListProps) {
    const today = new Date().toISOString().split('T')[0];

    // Função para lidar com o incremento do progresso
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
                // Calculando o progresso de hoje
                const todayProgress = habit.completedDates.filter((date) => date === today).length;

                // Calculando o comprimento da borda do círculo (perímetro)
                const circleCircumference = 2 * Math.PI * 14; // Raio reduzido para 14
                const progressOffset = (circleCircumference * (habit.goal - todayProgress)) / habit.goal;

                return (
                    <div key={habit._id} className="space-y-2">
                        <div className="flex items-center gap-3">
                            {/* Barra de progresso atrás do botão */}
                            <div className="relative w-12 h-12 flex justify-center items-center">
                                {/* Círculo de fundo */}
                                <svg
                                    className="absolute w-full h-full rotate-90"
                                    viewBox="0 0 36 36"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="14"
                                        stroke="#d1d5db"
                                        strokeWidth="3"
                                        fill="none"
                                    />
                                </svg>

                                {/* Círculo de progresso */}
                                <svg
                                    className="absolute w-full h-full rotate-90"
                                    viewBox="0 0 36 36"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="14"
                                        stroke={todayProgress === habit.goal ? '#10b981' : '#3b82f6'}
                                        strokeWidth="3"
                                        fill="none"
                                        strokeDasharray={circleCircumference}
                                        strokeDashoffset={progressOffset}
                                        style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                                    />
                                </svg>

                                {/* Botão de incremento */}
                                <button
                                    onClick={() => handleIncrement(habit._id, todayProgress, habit.goal)}
                                    className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-lg focus:outline-none hover:bg-gray-500 z-10"
                                >
                                    {todayProgress === habit.goal ? '✔️' : '+'}
                                </button>
                            </div>
                        </div>
                        <span className="text-gray-800 text-sm">{habit.name}</span>

                        {/* Heatmap */}
                        <Heatmap habits={habits} />
                    </div>
                );
            })}
        </div>
    );
}
