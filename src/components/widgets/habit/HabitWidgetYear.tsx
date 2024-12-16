import { Habit, colorVariants, habitIcons } from "../../../utils/habitData";
import { Heatmap } from './Heatmap';
import { ProgressButton } from "./ProgressButtonCircular";

interface HabitProps {
    habit: Habit;
    onUpdateHabitProgress: (habitId: string) => void;
}

export function HabitWidgetYear({ habit, onUpdateHabitProgress }: HabitProps) {
    const today = new Date().toLocaleDateString();
    const todayProgress = habit.completedDates[today] || 0;
    const IconComponent = habitIcons.find(icon => icon.name === habit.icon)?.component as React.ElementType;

    return (
        <div className="space-y-2 w-full">
            <div className="flex justify-between">
                <div className="flex">
                    <div className={`w-10 h-10 rounded-md flex items-center justify-center text-white text-xl ${colorVariants[habit.color][700]}`}>
                        <IconComponent />
                    </div>
                    <div className="flex flex-col text-left ml-3">
                        <span className="text-gray-200 text-base break-word leading-4 mt-0.5">{habit.name}</span>
                        <span className="text-gray-200 text-sm">{habit.description}</span>
                    </div>
                </div>

                <ProgressButton
                    onClick={() => onUpdateHabitProgress(habit._id)}
                    todayProgress={todayProgress}
                    goal={habit.goal}
                />
            </div>

            <Heatmap habit={habit} type={'year'} />
        </div>
    );
}
