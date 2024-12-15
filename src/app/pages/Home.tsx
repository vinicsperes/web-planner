import { Heatmap } from '@/components/Heatmap'
import { HabitList } from '@/components/HabitList'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MultiStepDialog from '@/components/MultiStepDialog'
import { Habit } from '@/utils/habitData'
import { checkHabit, createHabit, fetchHabits } from '@/utils/fakeApi'
import { useEffect, useState } from 'react'

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
                        <HabitList habits={habits} onUpdateHabitProgress={handleUpdateProgress} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
