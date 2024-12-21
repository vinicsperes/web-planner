import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MultiStepDialog from '@/components/MultiStepDialog'
import { Habit } from '@/utils/habitData'
import { checkHabit, createHabit, fetchHabits } from '@/utils/fakeApi'
import { useEffect, useState } from 'react'

import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'
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

    useEffect(() => {
        if (habits.length > 0) {
            const grid = document.querySelector('.grid-stack') as HTMLElement
            if (grid) {
                GridStack.init({
                    float: true,
                    staticGrid: false,
                    resizable: 'e, s, n, w' as any,
                    cellHeight: 200,
                    alwaysShowResizeHandle: false
                }, grid)
            }
        }
    }, [habits])

    return (
        <div className="container mx-2 p-4">
            <div className="flex justify-between items-center p-4">
                <h1 className="text-3xl font-bold mb-6">web-planner</h1>
                <MultiStepDialog onAddHabit={handleAddHabit} />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <div className="grid-stack bg-gray-700 rounded-lg">
                    {habits.map((habit) => (
                        <div key={habit._id} className="grid-stack-item" data-gs-x="0" data-gs-y="0" data-gs-width="4" data-gs-height="2">
                            <div className="grid-stack-item-content bg-gray-900">
                                <HabitWidget key={habit._id} habit={habit} onUpdateHabitProgress={handleUpdateProgress} />
                                {/* <HabitWidgetYear key={habit._id} habit={habit} onUpdateHabitProgress={onUpdateHabitProgress} /> */}
                            </div>
                        </div>
                    ))}
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Habits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* <HabitList habits={habits} onUpdateHabitProgress={handleUpdateProgress} /> */}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
