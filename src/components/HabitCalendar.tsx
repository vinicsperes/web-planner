import * as React from "react"
import { format, isSameMonth } from "date-fns"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { colorVariants, Habit, habitIcons } from "@/utils/habitData"


interface HabitCalendarProps {
  habit: Habit
  onUpdateHabitProgress: (habitId: string) => void
}

export function HabitCalendar({ habit, onUpdateHabitProgress }: HabitCalendarProps) {
  const today = new Date().toLocaleDateString()
  const todayProgress = habit.completedDates[today] || 0

  const getColorClass = (date: Date) => {
    const dateKey = format(date, "MM/dd/yyyy")
    const count = habit.completedDates[dateKey] || 0
    const progressLevel = count / habit.goal

    if (progressLevel === 0)
      return "bg-gray-800"

    const opacityClass =
      progressLevel >= 1 ? "bg-opacity-100" :
        progressLevel >= 0.75 ? "bg-opacity-75" :
          progressLevel >= 0.5 ? "bg-opacity-50" :
            "bg-opacity-25"

    const colorClass = colorVariants[habit.color][500].bg
    return `${colorClass} ${opacityClass}`
  }

  const isToday = (date: Date) => {
    return format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
  }

  const progressPercentage = (todayProgress / habit.goal) * 100

  const IconComponent = habitIcons.find(icon => icon.name === habit.icon)?.component as React.ElementType

  return (
    <Card className="w-[300px] rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <IconComponent className={`${colorVariants[habit.color][950].text}`} />

          <span>{habit.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
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
                <div
                  {...props}
                  className={[
                    "w-8 h-8 flex items-center justify-center rounded-xl",
                    isCurrentMonth ? "text-foreground" : "text-muted-foreground",
                    getColorClass(date), 
                  ].join(" ")}
                >
                  {date.getDate()}
                </div>
              )
            },
          }}
        />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4 w-full">
          <Progress value={progressPercentage} className="flex-grow" />
          <span className="text-sm font-medium">{todayProgress}/{habit.goal}</span>
        </div>
        <Button onClick={() => onUpdateHabitProgress(habit._id)} className="w-full">Increment Habit</Button>
      </CardFooter>
    </Card>
  )
}