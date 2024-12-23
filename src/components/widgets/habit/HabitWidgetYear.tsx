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
                    <div className={`w-10 h-10 rounded-md flex items-center justify-center text-white text-xl ${colorVariants[habit.color][700]} shrink-0`}>
                        <IconComponent />
                    </div>
                    <div className="flex flex-col text-left ml-3">
                        <p className="w-50 text-gray-200 text-normal text-left line-clamp-2 leading-4 mt-0.5 break-all">{habit.name}</p>
                        <p className="w-100 text-gray-200 text-sm text-left line-clamp-2 leading-4 mt-0.5 break-words">{habit.description}</p>
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
