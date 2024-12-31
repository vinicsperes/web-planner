import { useEffect, useMemo, useRef, useState } from 'react'
import { createSwapy, SlotItemMapArray, Swapy, utils } from "swapy"

import { Habit, Todo, Widget } from '@/utils/habitData'
import { checkHabit, createHabit, fetchHabits } from '@/utils/fakeApi'

import { DraggableWidget } from "@/components/widgets/DraggableWidget"
import { HabitCalendar } from "@/components/HabitCalendar"
import { FloatingMenu } from "@/components/floatingMenu/FloatingMenu"

import '@/swapyStyles.css'
import '../../globals.css'
import TodoWidget from '@/components/widgets/todo/TodoWidget'

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

    const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(utils.initSlotItemMap(widgets, '_id'))
    const slottedItems = useMemo(() => utils.toSlottedItems(widgets, '_id', slotItemMap), [widgets, slotItemMap])
    const swapyRef = useRef<Swapy | null>(null)
    const [isDragEnabled, setIsDragEnabled] = useState<boolean>(false)

    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => utils.dynamicSwapy(swapyRef.current, widgets, '_id', slotItemMap, setSlotItemMap), [widgets])

    useEffect(() => {
        swapyRef.current = createSwapy(containerRef.current!, {
            manualSwap: true,
            enabled: isDragEnabled
            // animation: 'dynamic',
            // autoScrollOnDrag: true,
            // swapMode: "hover"
            // enabled: true,
            // dragAxis: 'x',
            // dragOnHold: true
        })

        swapyRef.current.onSwap((event) => {
            setSlotItemMap(event.newSlotItemMap.asArray)
        })

        return () => {
            swapyRef.current?.destroy()
        }
    }, [isDragEnabled])

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
        <div className='flex flex-col h-screen px-48'>
            <FloatingMenu setIsDragEnabled={setIsDragEnabled} isDragEnabled={isDragEnabled} onAddHabit={handleAddHabit} />
            <div className="flex justify-between items-center p-4 border">
                <h1 className="text-3xl font-bold mb-6">web-planner</h1>
            </div>
            <div className="border-x h-full p-4" ref={containerRef}>
                <div className="items">
                    {slottedItems.map(({ slotId, itemId, item }) => (
                        <div className="slot" key={slotId} data-swapy-slot={slotId}>
                            {item && (
                                <DraggableWidget
                                    itemId={itemId}
                                    isDragEnabled={isDragEnabled}
                                >
                                    {/* <HabitWidget key={item._id} habit={item} onUpdateHabitProgress={handleUpdateProgress} /> */}
                                    {item.type === 'habit' ? (
                                        <HabitCalendar key={item._id} habit={item as Habit} onUpdateHabitProgress={handleUpdateProgress} />
                                    ) : item.type === 'todo' ? (
                                        <TodoWidget />
                                    )
                                        : null}
                                </DraggableWidget>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <TodoWidget />
            </div>
        </div >
    )
}
