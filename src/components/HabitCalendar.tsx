"use client"

import * as React from "react"
import { addDays, format, startOfToday, isSameMonth } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TypeIcon as type, type LucideIcon } from 'lucide-react'

interface HabitData {
  [date: string]: number
}

interface HabitCalendarProps {
  name: string
  icon: LucideIcon
  goal: number
  initialData?: HabitData
}

export function HabitCalendar({ name, icon: Icon, goal, initialData = {} }: HabitCalendarProps) {
  const [habitData, setHabitData] = React.useState<HabitData>(initialData)
  const today = startOfToday()

  const incrementHabit = () => {
    const dateKey = format(today, "yyyy-MM-dd")
    const currentCount = habitData[dateKey] || 0
    const newCount = currentCount >= goal ? 0 : currentCount + 1
    setHabitData({ ...habitData, [dateKey]: newCount })
  }

  const getColor = (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd")
    const count = habitData[dateKey] || 0
    const intensity = count / goal
    return `rgba(0, 128, 0, ${intensity})`
  }

  const isToday = (date: Date) => {
    return format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
  }

  const todayProgress = habitData[format(today, "yyyy-MM-dd")] || 0
  const progressPercentage = (todayProgress / goal) * 100

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icon className="w-6 h-6" />
          <span>{name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={today}
          modifiers={{
            today: isToday,
          }}
          modifiersStyles={{
            today: { backgroundColor: "hsl(var(--primary) / 0.1)" },
          }}
          className="rounded-md border"
          components={{
            Day: ({ date, ...props }) => {
              const isCurrentMonth = isSameMonth(date, props.displayMonth)
              return (
                <button
                  {...props}
                  className={`w-8 h-8 flex items-center justify-center ${
                    isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                  style={{
                    backgroundColor: getColor(date),
                  }}
                >
                  {date.getDate()}
                </button>
              )
            },
          }}
        />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4 w-full">
          <Progress value={progressPercentage} className="flex-grow" />
          <span className="text-sm font-medium">{todayProgress}/{goal}</span>
        </div>
        <Button onClick={incrementHabit} className="w-full">Increment Habit</Button>
      </CardFooter>
    </Card>
  )
}

