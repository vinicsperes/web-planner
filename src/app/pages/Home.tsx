import { Heatmap } from '@/components/Heatmap'
import { HabitList } from '@/components/HabitList'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MultiStepDialog from '@/components/MultiStepDialog'
import { checkHabit, fetchHabits } from '@/utils/fakeApi'

export default function Home() {
    const habitsResult = fetchHabits()

    const habits = (habitsResult.success === true)
        ? habitsResult.value
        : []

    function toggleHabit(habit: string) {
        console.log('check')
        const result = checkHabit(habit)
        console.log(result)
    }

    console.log(habits)

    return (
        <div className="container mx-2 p-4">
            <div className="flex justify-between items-center p-4">
                <h1 className="text-3xl font-bold mb-6">web-planner</h1>
                <MultiStepDialog />
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
        </div >
    )
}
