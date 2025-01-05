import { useEffect, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout';

import { Habit, Todo, Widget } from '@/utils/habitData'
import { checkHabit, createHabit, fetchHabits } from '@/utils/fakeApi'

import { HabitWidget } from "@/components/widgets/habit/HabitWidget"
import { FloatingMenu } from "@/components/floatingMenu/FloatingMenu"
import TodoWidget from '@/components/widgets/todo/TodoWidget'

import '../../globals.css'
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { DraggableWidget } from '@/components/widgets/DraggableWidget';

const ResponsiveGridLayout = WidthProvider(Responsive)

export default function Home() {
    const [habits, setHabits] = useState<Habit[]>([])
    const [todos] = useState<Todo[]>([
        { _id: '10', title: 'teste', type: 'todo' }
    ])
    const [isDragEnabled, setIsDragEnabled] = useState<boolean>(false)

    const widgets: Widget[] = [
        ...habits.map((habit) => ({
            ...habit,
            type: 'habit'
        } as Widget)), ...todos]


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
        if (isDragEnabled) {
            document.body.style.userSelect = 'none';
        } else {
            document.body.style.userSelect = '';
        }
        return () => {
            document.body.style.userSelect = '';
        }
    }, [isDragEnabled])

    const layouts = {
        lg: widgets.map((item, index) => ({
            i: item._id,
            x: (index % 6) * 2,
            y: Math.floor(index / 6),
            w: 2,
            h: 2,
        })),
        md: widgets.map((item, index) => ({
            i: item._id,
            x: (index % 5) * 2,
            y: Math.floor(index / 5),
            w: 2,
            h: 2,
        })),
        sm: widgets.map((item, index) => ({
            i: item._id,
            x: (index % 3) * 4,
            y: Math.floor(index / 3),
            w: 2,
            h: 2,
        })),
        xs: widgets.map((item, index) => ({
            i: item._id,
            x: 0,
            y: index,
            w: 2,
            h: 2,
        })),
        xxs: widgets.map((item, index) => ({
            i: item._id,
            x: 0,
            y: index,
            w: 2,
            h: 2,
        })),
    }

    const breakpoints = { lg: 1280, md: 992, sm: 768, xs: 480, xxs: 0 }
    const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }

    return (
        <div className='flex flex-col h-screen px-48'>
            <FloatingMenu setIsDragEnabled={setIsDragEnabled} isDragEnabled={isDragEnabled} onAddHabit={handleAddHabit} />
            <div className="flex justify-between items-center p-4 border">
                <h1 className="text-3xl font-bold mb-6">web-planner</h1>
            </div>
            <div className="border-x h-full p-4">
                <ResponsiveGridLayout
                    className="layout"
                    layouts={layouts}
                    breakpoints={breakpoints}
                    cols={cols}
                    rowHeight={150}
                    isResizable={false}
                    isDraggable={isDragEnabled}
                    autoSize
                >
                    {widgets.map((item) => (
                        <div key={item._id}>
                            {item.type === 'habit' ? (
                                <DraggableWidget itemId={item._id} isDragEnabled={isDragEnabled}>
                                    <HabitWidget habit={item as Habit} onUpdateHabitProgress={handleUpdateProgress} />
                                </DraggableWidget>
                            ) : item.type === 'todo' ? (
                                <DraggableWidget itemId={item._id} isDragEnabled={isDragEnabled}>
                                    <TodoWidget />
                                </DraggableWidget>
                            ) : null}
                        </div>
                    ))}
                </ResponsiveGridLayout>
            </div>
        </div >
    )
}
