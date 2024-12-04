import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Habit } from '../utils/habitData'
import { Heatmap } from './Heatmap'

interface HabitListProps {
    habits: Habit[];
    onToggleHabit: (habitId: string) => void;
}

export function HabitList({ habits, onToggleHabit }: HabitListProps) {
    const today = new Date().toISOString().split('T')[0]

    return (
        <div className="space-y-6">
            {habits.map((habit) => (
                <div key={habit.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id={habit.id}
                            checked={habit.completedDates.includes(today)}
                            onCheckedChange={() => onToggleHabit(habit.id)}
                        />
                        <Label htmlFor={habit.id}>{habit.name}</Label>
                    </div>
                    <Heatmap habit={habit} />
                </div>
            ))}
        </div>
    );
}


