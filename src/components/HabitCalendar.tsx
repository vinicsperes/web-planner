import * as React from "react"
import { format, isSameMonth } from "date-fns"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { colorVariants, Habit, habitIcons } from "@/utils/habitData"
import { CheckIcon, PlusIcon } from "lucide-react"

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
    <Card className="border bg-card dark:bg-card-dark rounded-xl">
      <CardHeader>
        <CardTitle className="text-card-foreground flex items-center space-x-2">
          <div className={`shrink-0 w-10 h-10 rounded-md flex items-center justify-center text-white text-xl ${colorVariants[habit.color][700].bg}`}>
            <IconComponent className={`${colorVariants[habit.color][950].text}`} />
          </div>
          <p>{habit.name}</p>
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
          className="p-0 dark:text-card-foreground dark:card rounded-md "
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
          <div className="relative w-full h-1 bg-gray-400 rounded-sm mt-1">
            <div
              className={`absolute top-0 left-0 h-full ${colorVariants[habit.color][600].bg} rounded-full`}
              style={{
                width: `${progressPercentage}%`,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <span className="text-sm font-medium">{todayProgress}/{habit.goal}</span>
        </div>
        <Button variant='default' onClick={() => onUpdateHabitProgress(habit._id)} className="w-full" >
          {todayProgress === habit.goal ? <CheckIcon /> : <>Increment Habit <PlusIcon /></>}
        </Button>
      </CardFooter>
    </Card>
  )
}
