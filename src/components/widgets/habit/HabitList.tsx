import { Habit } from "@/utils/habitData";
import { HabitWidget } from "./HabitWidget";

interface HabitListProps {
    habits: Habit[]
    onUpdateHabitProgress: (habitId: string) => void
}

export function HabitList({ habits, onUpdateHabitProgress }: HabitListProps) {
    return (
        <div className="space-y-6">
            {habits.map((habit) => (
                <HabitWidget key={habit._id} habit={habit} onUpdateHabitProgress={onUpdateHabitProgress} />
            ))}
        </div>
    );
}
