export interface Habit {
    habit_id: string
    name: string
    description: string
    goal: number
    category: string
    daily_checks: number
    completedDates: string[]
    color: string
}

export function getLastNDays(n: number): Date[] {
    const result = []
    for (let i = 0; i < n; i++) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        result.unshift(d)
    }
    return result
}

export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0]
}

export function getOpacity(completedCount: number, totalHabits: number): string {
    const percentage = completedCount / totalHabits
    if (percentage === 1) return 'opacity-100'
    if (percentage >= 0.7) return 'opacity-75'
    if (percentage >= 0.4) return 'opacity-50'
    if (percentage > 0) return 'opacity-25'
    return 'opacity-10'
}


