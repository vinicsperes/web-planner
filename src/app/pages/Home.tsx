import { useState } from 'react';
import { Habit } from '@/utils/habitData';
import { Heatmap } from '@/components/Heatmap';
import { HabitList } from '@/components/HabitList';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button, ButtonIcon } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
   
export default function Home() {
    const initialHabits = JSON.parse(localStorage.getItem('habits') ?? '[]')
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
            <div className="flex justify-between items-center p-4">
                <h1 className="text-3xl font-bold mb-6">web-planner</h1>
                
                <Dialog>
                    <DialogTrigger asChild>
                        <ButtonIcon/>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                            Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                            Username
                            </Label>
                            <Input id="username" value="@peduarte" className="col-span-3" />
                        </div>
                        </div>
                        <DialogFooter>
                        <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
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


