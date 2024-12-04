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

export const habits: Habit[] = [
    {
        habit_id: '0',
        name: "Morning Run",
        description: "Go for a 30-minute run every morning.",
        goal: 30,
        category: "Health",
        daily_checks: 0,
        completedDates: [],
        color: "#FF5733", // A vibrant orange-red color
    },
    {
        habit_id: '1',
        name: "Read a Book",
        description: "Read at least 10 pages of a book daily.",
        goal: 10,
        category: "Personal Development",
        daily_checks: 0,
        completedDates: [],
        color: "#33A1FF", // A calming blue color
    },
    {
        habit_id: '2',
        name: "Drink Water",
        description: "Drink 8 glasses of water per day.",
        goal: 8,
        category: "Health",
        daily_checks: 0,
        completedDates: [],
        color: "#33FF57", // A refreshing green color
    },
    {
        habit_id: '3',
        name: "Learn Coding",
        description: "Practice coding for 1 hour every day.",
        goal: 1,
        category: "Skill Development",
        daily_checks: 0,
        completedDates: [],
        color: "#FFC300", // A motivating yellow color
    },
    {
        habit_id: '4',
        name: "Meditation",
        description: "Meditate for 15 minutes daily.",
        goal: 15,
        category: "Mindfulness",
        daily_checks: 0,
        completedDates: [],
        color: "#9B59B6", // A serene purple color
    },
];

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


