import { formatDate } from "date-fns";
import { Habit } from "./habitData";

type Result<T, E> =
    | { success: true; value: T }
    | { success: false; error: E }

function getHabits(): Habit[] {
    const storedString = localStorage.getItem('habits') || '[]';
    return JSON.parse(storedString)
}
    
function setHabits(habits: Habit[]): void {
    const habitsString = JSON.stringify(habits);

    localStorage.setItem('habits', habitsString)
}

export function fetchHabits(): Result<Habit[], string> {
    const habits = getHabits()

    if (!habits) return { success: false, error: 'Error fetching habits' }
    return { success: true, value: habits }
}

export function createHabit(habit: Habit): Result<Habit[], string> {
    const habits = getHabits()

    habits.push(habit)

    if (!habits || habits.length === 0) return { success: false, error: 'Error creating habit' }

    setHabits(habits)
    return { success: true, value: habits }
}

export function deleteHabit(habitId: string): Result<Habit[], string> {
    const habits = getHabits()

    if (!habits) return { success: false, error: 'No habits found' }

    const filteredHabits = habits.filter(habit => habit._id != habitId)

    if (habits.length === filteredHabits.length) return { success: false, error: `Habit with id ${habitId} not found` }

    setHabits(filteredHabits)
    return { success: true, value: filteredHabits }
}

export function editHabit(habitId: string, editedHabit: Habit): Result<Habit[], string> {
    const habits = getHabits()

    if (!habits) return { success: false, error: 'No habits found' }

    const updatedHabits = habits.filter(habit => habit._id != habitId)

    if (habits.length === updatedHabits.length) return { success: false, error: `Habit with id ${habitId} not found` }

    updatedHabits.push(editedHabit)
    setHabits(updatedHabits)
    return { success: true, value: updatedHabits }
}

export function checkHabit(habitId: string): Result<Habit, string> {
    const habits = getHabits()
    if (!habits) return { success: false, error: 'No habits found' }

    const checkedHabit = habits.find(habit => habit._id === habitId)
    if (!checkedHabit) return { success: false, error: `Habit with id ${habitId} not found` }

    const today = formatDate(new Date(), "MM/dd/yyyy")
    const completedMap = checkedHabit.completedDates
    const completedDateCount = completedMap[today]

    const newCount =
        !completedDateCount ? 1
            : completedDateCount >= checkedHabit.goal
                ? 0
                : completedDateCount + 1

    completedMap[today] = newCount
    
    const updatedHabits = habits.map(habit => {
        if (habit._id === habitId) {
            return checkedHabit
        }

        return habit
    })

    setHabits(updatedHabits)

    return { success: true, value: checkedHabit }
}
