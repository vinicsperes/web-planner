import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MultiStepDialog from '@/components/NewWidgetDialog'
import { Habit } from '@/utils/habitData'
import { checkHabit, createHabit, fetchHabits } from '@/utils/fakeApi'
import { useEffect, useMemo, useRef, useState } from 'react'

import { HabitWidget } from '@/components/widgets/habit/HabitWidget'
import '../../globals.css'
import { createSwapy, SlotItemMapArray, Swapy, utils } from "swapy"
import '@/swapyStyles.css'
import { ThemeToggle } from "@/components/floatingMenu/actions/ThemeToggle"
import RearrangeWidgetsButton from "@/components/floatingMenu/actions/RearrangeWidgetsButton"
import { EmbbededPlayer } from "@/components/spotify/EmbbededPlayer"
import { DraggableWidget } from "@/components/widgets/DraggableWidget"
import { HabitCalendar } from "@/components/HabitCalendar"
import { Snail } from "lucide-react"
import { FloatingMenu } from "@/components/floatingMenu/FloatingMenu"

export default function Home() {
    const [habits, setHabits] = useState<Habit[]>([])
    
    const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(utils.initSlotItemMap(habits, '_id'))
    const slottedItems = useMemo(() => utils.toSlottedItems(habits, '_id', slotItemMap), [habits, slotItemMap])
    const swapyRef = useRef<Swapy | null>(null)
    const [isDragEnabled, setIsDragEnabled] = useState(true); // Add this state

    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => utils.dynamicSwapy(swapyRef.current, habits, '_id', slotItemMap, setSlotItemMap), [habits])

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

    const [exerciseData, setExerciseData] = useState({
        "2024-12-20": 3,
        "2024-12-21": 5,
        "2024-12-22": 2,
        "2024-12-23": 4,
        "2024-12-24": 1
    })

    return (
        <div className="container mx-2 p-4">
            <FloatingMenu setIsDragEnabled={setIsDragEnabled} isDragEnabled={isDragEnabled} onAddHabit={handleAddHabit} />
            <div className="flex justify-between items-center p-4">
                <h1 className="text-3xl font-bold mb-6">web-planner</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Today's Habits</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="container" ref={containerRef}>
                        <div className="items">
                            {slottedItems.map(({ slotId, itemId, item }) => (
                                <div className="slot" key={slotId} data-swapy-slot={slotId}>
                                    {item &&
                                        <DraggableWidget
                                            itemId={itemId}
                                            isDragEnabled={isDragEnabled}
                                        >
                                            <HabitWidget key={item._id} habit={item} onUpdateHabitProgress={handleUpdateProgress} />
                                        </DraggableWidget>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <EmbbededPlayer />
                    </div>
                    <div>
                        <HabitCalendar name="Exercise" icon={Snail} goal={5} initialData={exerciseData}/>
                    </div>
                </CardContent>
            </Card>
        </div >
    )
}
