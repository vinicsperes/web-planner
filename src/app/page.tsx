import { useEffect, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout';

import { Habit, Todo, Widget } from '@/utils/habitData'
import { checkHabit, createHabit, fetchHabits } from '@/utils/fakeApi'

import TodoWidget from '@/components/widgets/todo/TodoWidget'
import { HabitWidget } from "@/components/widgets/habit/HabitWidget"
import { FloatingMenu } from "@/components/floatingMenu/FloatingMenu"
import { DraggableWidget } from '@/components/widgets/components/draggableWidget/DraggableWidget';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import './globals.css'
import { AppSidebar } from '@/components/ui/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/header/Header';
const ResponsiveGridLayout = WidthProvider(Responsive)

export default function Home() {
    const [habits, setHabits] = useState<Habit[]>([])
    const [todos] = useState<Todo[]>([
        { _id: '10', title: 'teste', type: 'todo', width: 4, height: 3 }
    ])
    const [isDragEnabled, setIsDragEnabled] = useState<boolean>(false)

    const widgets: Widget[] = [
        ...habits.map((habit) => ({
            ...habit,
            type: 'habit',
            width: 2, // Altura e largura para os que não foram cadastrados
            height: 2,
        } as Widget)),
        ...todos.map((todo) => ({
            ...todo,
            type: 'todo',
        } as Widget))
    ];

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
            w: item.width,
            h: item.height,
        })),
        md: widgets.map((item, index) => ({
            i: item._id,
            x: (index % 5) * 2,
            y: Math.floor(index / 5),
            w: item.width,
            h: item.height,
        })),
        sm: widgets.map((item, index) => ({
            i: item._id,
            x: (index % 3) * 4,
            y: Math.floor(index / 3),
            w: item.width,
            h: item.height,
        })),
        xs: widgets.map((item, index) => ({
            i: item._id,
            x: 0,
            y: index,
            w: item.width,
            h: item.height,
        })),
        xxs: widgets.map((item, index) => ({
            i: item._id,
            x: 0,
            y: index,
            w: item.width,
            h: item.height,
        })),
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <div className='flex flex-col h-screen px-48'>
                    <FloatingMenu setIsDragEnabled={setIsDragEnabled} isDragEnabled={isDragEnabled} onAddHabit={handleAddHabit} />
                    <div className="border-x h-full p-4">
                        <ResponsiveGridLayout
                            className="layout"
                            layouts={layouts}
                            rowHeight={150}
                            isResizable={false}
                            isDraggable={isDragEnabled}
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
            </SidebarInset>
        </SidebarProvider>
    )
}


