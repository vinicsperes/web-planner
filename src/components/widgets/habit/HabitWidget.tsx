import { colorVariants, Habit, habitIcons } from '@/utils/habitData';
import { Heatmap } from './Heatmap';
import { ProgressButtonRetangular } from './ProgressButtonRectangular';
import { ChevronDown, GripHorizontal } from 'lucide-react';
import { WidgetActions } from './WidgetActions';

interface HabitProps {
    habit: Habit
    onUpdateHabitProgress: (habitId: string) => void
}

export function HabitWidget({ habit, onUpdateHabitProgress }: HabitProps) {
    const today = new Date().toLocaleDateString()
    const todayProgress = habit.completedDates[today] || 0
    const IconComponent = habitIcons.find(icon => icon.name === habit.icon)?.component as React.ElementType

    return (
        <div className="space-y-2 w-36 m-2 rounded-lg bg-gray-900">
            <div className="flex gap-2">
                <div className={`shrink-0 w-10 h-10 rounded-md flex items-center justify-center text-white text-xl ${colorVariants[habit.color][700].bg}`}>
                    <IconComponent className={`${colorVariants[habit.color][950].text}`} />
                </div>
                <p className="w-24 text-gray-200 text-sm text-left line-clamp-2 leading-4 mt-0.5 break-words">{habit.name}</p>
                <WidgetActions />
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