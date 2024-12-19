import { colorVariants, Habit, habitIcons } from '@/utils/habitData';
import { Heatmap } from './Heatmap';
import { ProgressButtonRetangular } from './ProgressButtonRectangular';

interface HabitProps {
    habit: Habit
    onUpdateHabitProgress: (habitId: string) => void
}

export function HabitWidget({ habit, onUpdateHabitProgress }: HabitProps) {
    const today = new Date().toLocaleDateString()
    const todayProgress = habit.completedDates[today] || 0
    const IconComponent = habitIcons.find(icon => icon.name === habit.icon)?.component as React.ElementType

    return (
        <div className="space-y-2 w-36">

            <div className="flex justify-between mb-2.5">
                <div className="flex flex-col text-left w-20 h-10">
                    <span className="text-gray-200 text-base break-word leading-4 mt-0.5">{habit.name}</span>
                    {/* <span className="text-gray-400 w-16 truncate text-xs" title={habit.description}>{habit.description}</span> */}
                </div>
                <div className={`w-10 h-10 rounded-md flex items-center justify-center text-white text-xl ${colorVariants[habit.color][700]}`}>
                    <IconComponent />
                </div>
            </div>
            <Heatmap habit={habit} type={'month'} />

            <ProgressButtonRetangular
                onClick={() => onUpdateHabitProgress(habit._id)}
                todayProgress={todayProgress}
                goal={habit.goal}
            />
        </div>
    );
}
