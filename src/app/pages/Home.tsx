import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MultiStepDialog from '@/components/MultiStepDialog'
import { Habit } from '@/utils/habitData'
import { checkHabit, createHabit, fetchHabits } from '@/utils/fakeApi'
import { useEffect, useState } from 'react'

import { HabitWidget } from '@/components/widgets/habit/HabitWidget'
import '../../globals.css'


export default function Home() {
    const [habits, setHabits] = useState<Habit[]>([])

    const handleAddHabit = (newHabit: Habit) => {
        const result = createHabit(newHabit)

        if (result.success) setHabits(result.value)
        else console.log(result.error)
    }

    const handleUpdateProgress = (habitId: string) => {
        const result = checkHabit(habitId)

        if (result.success) {
            const habitsResult = fetchHabits()
            habitsResult.success ? setHabits(habitsResult.value) : console.log(habitsResult.error)
        } else {
            console.log(result.error)
        }
    }

    useEffect(() => {
        const habitsResult = fetchHabits()
        if (habitsResult.success) setHabits(habitsResult.value)
        else console.log(habitsResult.error)
    }, [])


    return (
        <div className="container mx-2 p-4">
            <div className="flex justify-between items-center p-4">
                <h1 className="text-3xl font-bold mb-6">web-planner</h1>
                <MultiStepDialog onAddHabit={handleAddHabit} />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Today's Habits</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                    {habits.map((habit) => (
                        <div key={habit._id} className="flex justify-center w-min p-3 rounded-lg bg-gray-900">
                            <HabitWidget key={habit._id} habit={habit} onUpdateHabitProgress={handleUpdateProgress} />
                            {/* <HabitWidgetYear key={habit._id} habit={habit} onUpdateHabitProgress={onUpdateHabitProgress} /> */}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
