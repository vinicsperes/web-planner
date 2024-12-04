import { useState } from 'react';
import { Habit } from '@/utils/habitData';
import { Heatmap } from '@/components/Heatmap';
import { HabitList } from '@/components/HabitList';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export default function Home() {
    const initialHabits = JSON.parse(localStorage.getItem('habits') ?? '')
    const [habits, setHabits] = useState<Habit[]>(initialHabits);

    const toggleHabit = (habitId: string) => {
        setHabits(prevHabits => {
            const updatedHabits = prevHabits.map(habit => {
                if (habit.habit_id === habitId) {
                    const today = new Date().toISOString().split('T')[0];
                    const updatedDates = habit.completedDates.includes(today)
                        ? habit.completedDates.filter(date => date !== today)
                        : [...habit.completedDates, today];
                    return { ...habit, completedDates: updatedDates };
                }
                return habit;
            });

            localStorage.setItem('habits', JSON.stringify(updatedHabits));
            return updatedHabits;
        });
    };

    return (
        <div className="container mx-2 p-4">
            <h1 className="text-3xl font-bold mb-6">Habit Tracker</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Overall Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Heatmap habits={habits} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Habits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <HabitList habits={habits} onToggleHabit={toggleHabit} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


