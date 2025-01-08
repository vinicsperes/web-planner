import * as React from "react"
import { format, isSameMonth } from "date-fns"

import { Calendar } from "@/app/components/ui/calendar"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"

import { colorVariants, Habit, habitIcons } from "@/utils/habitData"
import { CheckIcon, PlusIcon } from "lucide-react"

interface HabitWidgetProps {
  habit: Habit
  onUpdateHabitProgress: (habitId: string) => void
}

export function HabitWidget({ habit, onUpdateHabitProgress }: HabitWidgetProps) {
  const today = format(new Date(), "MM/dd/yyyy")
  const todayProgress = habit.completedDates[today] || 0

  const getColorClass = (date: Date) => {
    const dateKey = format(date, "MM/dd/yyyy")
    const count = habit.completedDates[dateKey] || 0
    const progressLevel = count / habit.goal

    if (progressLevel === 0)
      return "bg-zinc-200 dark:bg-zinc-900 bg-opacity-100 text-zinc-800 dark:text-zinc-500 text-opacity-70"

    const opacityClass =
      progressLevel >= 1 ? "bg-opacity-100" :
        progressLevel >= 0.75 ? "bg-opacity-85" :
          progressLevel >= 0.5 ? "bg-opacity-60" :
            "bg-opacity-40"

    const colorClass = colorVariants[habit.color][500].bg
    return `${colorClass} ${opacityClass}`
  }

  const isToday = (date: Date) => {
    return format(date, "MM/dd/yyyy") === today
  }

  const progressPercentage = (todayProgress / habit.goal) * 100

  const IconComponent = habitIcons.find(icon => icon.name === habit.icon)?.component as React.ElementType

  return (
    <Card key={habit._id} className="min-w-52 max-w-52 card-content border bg-card dark:bg-card-dark rounded-xl grid-item">
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-card-foreground flex justify-between space-x-2">
          <div className="flex gap-2 align-middle leading-normal">
            <IconComponent className={`w-6 h-6 ${colorVariants[habit.color][500].text}`} />
            <p>{habit.name}</p>
          </div>
          <span className="text-sm font-medium">{todayProgress}/{habit.goal}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <Calendar
          mode="single"
          modifiers={{
            today: isToday,
          }}
          modifiersStyles={{
            today: { backgroundColor: "hsl(var(--primary) / 0.1)" },
          }}
          className="p-0 dark:text-card-foreground dark:card rounded-md"
          components={{
            Day: ({ date, displayMonth, ...props }) => {
              const isCurrentMonth = isSameMonth(date, displayMonth)
              return (
                <div
                  {...props}
                  className={[
                    "w-6 h-6 flex items-center justify-center rounded-md m-[1px]",
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
      <CardFooter className="flex px-3 pb-3 flex-col space-y-4">
        <div className="flex items-center gap-2 w-full">
          <div className="relative w-full h-1 bg-gray-400 rounded-sm mt-1">
            <div
              className={`absolute top-0 left-0 h-full ${colorVariants[habit.color][600].bg} rounded-full`}
              style={{
                width: `${progressPercentage}%`,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <Button variant='outline' className="shrink-0" size={"icon"} onClick={() => onUpdateHabitProgress(habit._id)} >
            {todayProgress === habit.goal ? <CheckIcon /> : <PlusIcon />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}