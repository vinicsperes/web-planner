export interface Habit {
    id: string
    name: string
    completedDates: string[]
    color: string
}

export const habits: Habit[] = [
    { id: '1', name: 'Exercise', completedDates: ['2023-06-01', '2023-06-02', '2023-06-04'], color: 'bg-red-500' },
    { id: '2', name: 'Read', completedDates: ['2023-06-01', '2023-06-03', '2023-06-04'], color: 'bg-blue-500' },
    { id: '3', name: 'Meditate', completedDates: ['2023-06-02', '2023-06-03', '2023-06-04'], color: 'bg-green-500' },
]

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


