import { Activity, Book, Coffee, Dumbbell, Music, Heart, Sun, Moon, Star, Cloud, Zap, Droplet, Flame, Leaf, Feather, Eye, Camera, Check, Bell, Gift, Target } from 'lucide-react'

export interface Habit {
    _id: string
    name: string
    icon: string
    description: string
    goal: number
    category?: string
    daily_checks?: number
    completedDates: { [key: string]: number }
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

export const habitColors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']

export const colorVariants: Record<string, Record<number, string>> = {
    red: {
      400: 'bg-red-400',
      500: 'bg-red-500',
      600: 'bg-red-600',
      700: 'bg-red-700',
    },
    blue: {
      400: 'bg-blue-400',
      500: 'bg-blue-500',
      600: 'bg-blue-600',
      700: 'bg-blue-700',
    },
    green: {
      400: 'bg-green-400',
      500: 'bg-green-500',
      600: 'bg-green-600',
      700: 'bg-green-700',
    },
    yellow: {
      400: 'bg-yellow-400',
      500: 'bg-yellow-500',
      600: 'bg-yellow-600',
      700: 'bg-yellow-700',
    },
    purple: {
      400: 'bg-purple-400',
      500: 'bg-purple-500',
      600: 'bg-purple-600',
      700: 'bg-purple-700',
    },
    pink: {
      400: 'bg-pink-400',
      500: 'bg-pink-500',
      600: 'bg-pink-600',
      700: 'bg-pink-700',
    },
    indigo: {
      400: 'bg-indigo-400',
      500: 'bg-indigo-500',
      600: 'bg-indigo-600',
      700: 'bg-indigo-700',
    },
    teal: {
      400: 'bg-teal-400',
      500: 'bg-teal-500',
      600: 'bg-teal-600',
      700: 'bg-teal-700',
    },
    orange: {
      400: 'bg-orange-400',
      500: 'bg-orange-500',
      600: 'bg-orange-600',
      700: 'bg-orange-700',
    },
    cyan: {
      400: 'bg-cyan-400',
      500: 'bg-cyan-500',
      600: 'bg-cyan-600',
      700: 'bg-cyan-700',
    },
    lime: {
      400: 'bg-lime-400',
      500: 'bg-lime-500',
      600: 'bg-lime-600',
      700: 'bg-lime-700',
    },
    emerald: {
      400: 'bg-emerald-400',
      500: 'bg-emerald-500',
      600: 'bg-emerald-600',
      700: 'bg-emerald-700',
    },
    sky: {
      400: 'bg-sky-400',
      500: 'bg-sky-500',
      600: 'bg-sky-600',
      700: 'bg-sky-700',
    },
    violet: {
      400: 'bg-violet-400',
      500: 'bg-violet-500',
      600: 'bg-violet-600',
      700: 'bg-violet-700',
    },
    fuchsia: {
      400: 'bg-fuchsia-400',
      500: 'bg-fuchsia-500',
      600: 'bg-fuchsia-600',
      700: 'bg-fuchsia-700',
    },
    rose: {
      400: 'bg-rose-400',
      500: 'bg-rose-500',
      600: 'bg-rose-600',
      700: 'bg-rose-700',
    },
    amber: {
      400: 'bg-amber-400',
      500: 'bg-amber-500',
      600: 'bg-amber-600',
      700: 'bg-amber-700',
    },
  };

  export function getLastNDays(n: number): string[] {
    const result = [];
    const today = new Date();

    for (let i = 0; i < n; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        result.unshift(date.toLocaleDateString());
    }

    return result;
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
