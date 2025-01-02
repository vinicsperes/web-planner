import { useEffect, useState } from 'react'
import GridLayout from 'react-grid-layout';

import { Habit, Todo, Widget } from '@/utils/habitData'
import { checkHabit, createHabit, fetchHabits } from '@/utils/fakeApi'

import { HabitWidget } from "@/components/widgets/habit/HabitWidget"
import { FloatingMenu } from "@/components/floatingMenu/FloatingMenu"
import TodoWidget from '@/components/widgets/todo/TodoWidget'

import '../../globals.css'
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default function Home() {
    const [habits, setHabits] = useState<Habit[]>([])
    const [todos] = useState<Todo[]>([
        { _id: '10', title: 'teste', type: 'todo' }
    ])

    const widgets: Widget[] = [
        ...habits.map((habit) => ({
            ...habit,
            type: 'habit'
        } as Widget)), ...todos]

    const [isDragEnabled, setIsDragEnabled] = useState<boolean>(false)

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

    const initialLayout = widgets.map((item, index) => ({
        i: item._id,
        x: (index % 4) * 3, // Ajusta as colunas
        y: Math.floor(index / 4), // Ajusta as linhas
        w: 2, // Largura em colunas
        h: 2, // Altura em linhas, baseada no rowHeight
    }));

    return (
        <div className='flex flex-col h-screen px-48'>
            <FloatingMenu setIsDragEnabled={setIsDragEnabled} isDragEnabled={isDragEnabled} onAddHabit={handleAddHabit} />
            <div className="flex justify-between items-center p-4 border">
                <h1 className="text-3xl font-bold mb-6">web-planner</h1>
            </div>
            <div className="border-x h-full p-4">
                <GridLayout
                    className="layout"
                    layout={initialLayout}
                    cols={12}
                    rowHeight={150}
                    width={1336}
                    isResizable={isDragEnabled}
                    isDraggable={isDragEnabled}
                    autoSize
                >
                    {widgets.map((item) => (
                        <div key={item._id}>
                            {item.type === 'habit' ? (
                                <HabitWidget habit={item as Habit} onUpdateHabitProgress={handleUpdateProgress} />
                            ) : item.type === 'todo' ? (
                                <TodoWidget />
                            ) : null}
                        </div>
                    ))}
                </GridLayout>
            </div>
        </div >
    )
}