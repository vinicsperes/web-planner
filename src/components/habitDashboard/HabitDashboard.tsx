"use client"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { Header } from "@/components/header/Header"
import { HabitWidget } from "../widgets/habit/HabitWidget"
import { Habit } from "@/utils/habitData"
import { checkHabit, fetchHabits } from "@/utils/fakeApi"
import { useEffect, useState } from "react"

export default function HabitDashboard() {
    const [habits, setHabits] = useState<Habit[]>([])

    useEffect(() => {
        const habitsResult = fetchHabits()
        if (habitsResult.success) setHabits(habitsResult.value)
        else console.log(habitsResult.error)
    }, [])

    const handleUpdateProgress = (habitId: string) => {
        const result = checkHabit(habitId)

        if (result.success) {
            const habitsResult = fetchHabits()
            habitsResult.success ? setHabits(habitsResult.value) : console.log(habitsResult.error)
        } else {
            console.log(result.error)
        }
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <main className="flex flex-wrap px-48 gap-4">
                    {habits.map((item) => (
                        <HabitWidget habit={item as Habit} onUpdateHabitProgress={handleUpdateProgress} />
                    ))}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
