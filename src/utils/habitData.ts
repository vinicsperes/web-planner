import { Activity, Book, Coffee, Dumbbell, Music, Heart, Sun, Moon, Star, Cloud, Zap, Droplet, Flame, Leaf, Feather, Eye, Camera, Check, Bell, Gift, Target } from 'lucide-react'

type DateCountMap = Map<string, number>

export interface Habit {
    _id: string
    name: string
    icon: string
    description: string
    goal: number
    category?: string
    daily_checks?: number
    completedDates: DateCountMap
    color: string
}

export interface HabitFormData {
    name: string;
    description: string;
    icon: string;
    color: string;
    goal: number;
}

export const habitIcons = [
    { name: 'Activity', component: Activity },
    { name: 'Book', component: Book },
    { name: 'Coffee', component: Coffee },
    { name: 'Dumbbell', component: Dumbbell },
    { name: 'Music', component: Music },
    { name: 'Heart', component: Heart },
    { name: 'Sun', component: Sun },
    { name: 'Moon', component: Moon },
    { name: 'Star', component: Star },
    { name: 'Cloud', component: Cloud },
    { name: 'Zap', component: Zap },
    { name: 'Droplet', component: Droplet },
    { name: 'Flame', component: Flame },
    { name: 'Leaf', component: Leaf },
    { name: 'Feather', component: Feather },
    { name: 'Eye', component: Eye },
    { name: 'Camera', component: Camera },
    { name: 'Check', component: Check },
    { name: 'Bell', component: Bell },
    { name: 'Gift', component: Gift },
    { name: 'Target', component: Target }
];

export const habitColors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500',
    'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500',
    'bg-lime-500', 'bg-emerald-500', 'bg-sky-500', 'bg-violet-500', 'bg-fuchsia-500',
    'bg-rose-500', 'bg-amber-500', 'bg-orange-700', 'bg-green-400', 'bg-violet-900',
    'bg-gray-400'
]

export function getLastNDays(n: number): string[] {
    const result = []

    for (let i = 0; i < n; i++) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        result.unshift(d.toLocaleDateString())
    }

    return result
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString().split('T')[0]
}

export function getOpacity(completedCount: number, totalHabits: number): string {
    const percentage = completedCount / totalHabits
    if (percentage === 1) return 'opacity-100'
    if (percentage >= 0.7) return 'opacity-75'
    if (percentage >= 0.4) return 'opacity-50'
    if (percentage > 0) return 'opacity-25'
    return 'opacity-10'
}
