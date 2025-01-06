import { Activity, Book, Coffee, Dumbbell, Music, Heart, Sun, Moon, Star, Cloud, Zap, Droplet, Flame, Leaf, Feather, Eye, Camera, Check, Bell, Gift, Target } from 'lucide-react'

export interface Widget {
    _id: string
    type: 'habit' | 'todo'
    width: number
    height: number
}

export interface Habit extends Widget {
    name: string
    icon: string
    description: string
    goal: number
    category?: string
    daily_checks?: number
    completedDates: { [key: string]: number }
    color: string
}

export interface Todo extends Widget {
    title: string
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

export const colorVariants: Record<
    string,
    Record<number, { bg: string; text: string }>
> = {
    red: {
        400: { bg: 'bg-red-400', text: 'text-red-400' },
        500: { bg: 'bg-red-500', text: 'text-red-500' },
        600: { bg: 'bg-red-600', text: 'text-red-600' },
        700: { bg: 'bg-red-700', text: 'text-red-700' },
        800: { bg: 'bg-red-800', text: 'text-red-800' },
        900: { bg: 'bg-red-900', text: 'text-red-900' },
        950: { bg: 'bg-red-950', text: 'text-red-950' },
    },
    blue: {
        400: { bg: 'bg-blue-400', text: 'text-blue-400' },
        500: { bg: 'bg-blue-500', text: 'text-blue-500' },
        600: { bg: 'bg-blue-600', text: 'text-blue-600' },
        700: { bg: 'bg-blue-700', text: 'text-blue-700' },
        800: { bg: 'bg-blue-800', text: 'text-blue-800' },
        900: { bg: 'bg-blue-900', text: 'text-blue-900' },
        950: { bg: 'bg-blue-950', text: 'text-blue-950' },
    },
    green: {
        400: { bg: 'bg-green-400', text: 'text-green-400' },
        500: { bg: 'bg-green-500', text: 'text-green-500' },
        600: { bg: 'bg-green-600', text: 'text-green-600' },
        700: { bg: 'bg-green-700', text: 'text-green-700' },
        800: { bg: 'bg-green-800', text: 'text-green-800' },
        900: { bg: 'bg-green-900', text: 'text-green-900' },
        950: { bg: 'bg-green-950', text: 'text-green-950' },
    },
    yellow: {
        400: { bg: 'bg-yellow-400', text: 'text-yellow-400' },
        500: { bg: 'bg-yellow-500', text: 'text-yellow-500' },
        600: { bg: 'bg-yellow-600', text: 'text-yellow-600' },
        700: { bg: 'bg-yellow-700', text: 'text-yellow-700' },
        800: { bg: 'bg-yellow-800', text: 'text-yellow-800' },
        900: { bg: 'bg-yellow-900', text: 'text-yellow-900' },
        950: { bg: 'bg-yellow-950', text: 'text-yellow-950' },
    },
    purple: {
        400: { bg: 'bg-purple-400', text: 'text-purple-400' },
        500: { bg: 'bg-purple-500', text: 'text-purple-500' },
        600: { bg: 'bg-purple-600', text: 'text-purple-600' },
        700: { bg: 'bg-purple-700', text: 'text-purple-700' },
        800: { bg: 'bg-purple-800', text: 'text-purple-800' },
        900: { bg: 'bg-purple-900', text: 'text-purple-900' },
        950: { bg: 'bg-purple-950', text: 'text-purple-950' },
    },
    pink: {
        400: { bg: 'bg-pink-400', text: 'text-pink-400' },
        500: { bg: 'bg-pink-500', text: 'text-pink-500' },
        600: { bg: 'bg-pink-600', text: 'text-pink-600' },
        700: { bg: 'bg-pink-700', text: 'text-pink-700' },
        800: { bg: 'bg-pink-800', text: 'text-pink-800' },
        900: { bg: 'bg-pink-900', text: 'text-pink-900' },
        950: { bg: 'bg-pink-950', text: 'text-pink-950' },
    },
    indigo: {
        400: { bg: 'bg-indigo-400', text: 'text-indigo-400' },
        500: { bg: 'bg-indigo-500', text: 'text-indigo-500' },
        600: { bg: 'bg-indigo-600', text: 'text-indigo-600' },
        700: { bg: 'bg-indigo-700', text: 'text-indigo-700' },
        800: { bg: 'bg-indigo-800', text: 'text-indigo-800' },
        900: { bg: 'bg-indigo-900', text: 'text-indigo-900' },
        950: { bg: 'bg-indigo-950', text: 'text-indigo-950' },
    },
    teal: {
        400: { bg: 'bg-teal-400', text: 'text-teal-400' },
        500: { bg: 'bg-teal-500', text: 'text-teal-500' },
        600: { bg: 'bg-teal-600', text: 'text-teal-600' },
        700: { bg: 'bg-teal-700', text: 'text-teal-700' },
        800: { bg: 'bg-teal-800', text: 'text-teal-800' },
        900: { bg: 'bg-teal-900', text: 'text-teal-900' },
        950: { bg: 'bg-teal-950', text: 'text-teal-950' },
    },
    orange: {
        400: { bg: 'bg-orange-400', text: 'text-orange-400' },
        500: { bg: 'bg-orange-500', text: 'text-orange-500' },
        600: { bg: 'bg-orange-600', text: 'text-orange-600' },
        700: { bg: 'bg-orange-700', text: 'text-orange-700' },
        800: { bg: 'bg-orange-800', text: 'text-orange-800' },
        900: { bg: 'bg-orange-900', text: 'text-orange-900' },
        950: { bg: 'bg-orange-950', text: 'text-orange-950' },
    },
    cyan: {
        400: { bg: 'bg-cyan-400', text: 'text-cyan-400' },
        500: { bg: 'bg-cyan-500', text: 'text-cyan-500' },
        600: { bg: 'bg-cyan-600', text: 'text-cyan-600' },
        700: { bg: 'bg-cyan-700', text: 'text-cyan-700' },
        800: { bg: 'bg-cyan-800', text: 'text-cyan-800' },
        900: { bg: 'bg-cyan-900', text: 'text-cyan-900' },
        950: { bg: 'bg-cyan-950', text: 'text-cyan-950' },
    },
    lime: {
        400: { bg: 'bg-lime-400', text: 'text-lime-400' },
        500: { bg: 'bg-lime-500', text: 'text-lime-500' },
        600: { bg: 'bg-lime-600', text: 'text-lime-600' },
        700: { bg: 'bg-lime-700', text: 'text-lime-700' },
        800: { bg: 'bg-lime-800', text: 'text-lime-800' },
        900: { bg: 'bg-lime-900', text: 'text-lime-900' },
        950: { bg: 'bg-lime-950', text: 'text-lime-950' },
    },
    emerald: {
        400: { bg: 'bg-emerald-400', text: 'text-emerald-400' },
        500: { bg: 'bg-emerald-500', text: 'text-emerald-500' },
        600: { bg: 'bg-emerald-600', text: 'text-emerald-600' },
        700: { bg: 'bg-emerald-700', text: 'text-emerald-700' },
        800: { bg: 'bg-emerald-800', text: 'text-emerald-800' },
        900: { bg: 'bg-emerald-900', text: 'text-emerald-900' },
        950: { bg: 'bg-emerald-950', text: 'text-emerald-950' },
    },
    sky: {
        400: { bg: 'bg-sky-400', text: 'text-sky-400' },
        500: { bg: 'bg-sky-500', text: 'text-sky-500' },
        600: { bg: 'bg-sky-600', text: 'text-sky-600' },
        700: { bg: 'bg-sky-700', text: 'text-sky-700' },
        800: { bg: 'bg-sky-800', text: 'text-sky-800' },
        900: { bg: 'bg-sky-900', text: 'text-sky-900' },
        950: { bg: 'bg-sky-950', text: 'text-sky-950' },
    },
    violet: {
        400: { bg: 'bg-violet-400', text: 'text-violet-400' },
        500: { bg: 'bg-violet-500', text: 'text-violet-500' },
        600: { bg: 'bg-violet-600', text: 'text-violet-600' },
        700: { bg: 'bg-violet-700', text: 'text-violet-700' },
        800: { bg: 'bg-violet-800', text: 'text-violet-800' },
        900: { bg: 'bg-violet-900', text: 'text-violet-900' },
        950: { bg: 'bg-violet-950', text: 'text-violet-950' },
    },
    fuchsia: {
        400: { bg: 'bg-fuchsia-400', text: 'text-fuchsia-400' },
        500: { bg: 'bg-fuchsia-500', text: 'text-fuchsia-500' },
        600: { bg: 'bg-fuchsia-600', text: 'text-fuchsia-600' },
        700: { bg: 'bg-fuchsia-700', text: 'text-fuchsia-700' },
        800: { bg: 'bg-fuchsia-800', text: 'text-fuchsia-800' },
        900: { bg: 'bg-fuchsia-900', text: 'text-fuchsia-900' },
        950: { bg: 'bg-fuchsia-950', text: 'text-fuchsia-950' },
    },
    rose: {
        400: { bg: 'bg-rose-400', text: 'text-rose-400' },
        500: { bg: 'bg-rose-500', text: 'text-rose-500' },
        600: { bg: 'bg-rose-600', text: 'text-rose-600' },
        700: { bg: 'bg-rose-700', text: 'text-rose-700' },
        800: { bg: 'bg-rose-800', text: 'text-rose-800' },
        900: { bg: 'bg-rose-900', text: 'text-rose-900' },
        950: { bg: 'bg-rose-950', text: 'text-rose-950' },
    },
    amber: {
        400: { bg: 'bg-amber-400', text: 'text-amber-400' },
        500: { bg: 'bg-amber-500', text: 'text-amber-500' },
        600: { bg: 'bg-amber-600', text: 'text-amber-600' },
        700: { bg: 'bg-amber-700', text: 'text-amber-700' },
        800: { bg: 'bg-amber-800', text: 'text-amber-800' },
        900: { bg: 'bg-amber-900', text: 'text-amber-900' },
        950: { bg: 'bg-amber-950', text: 'text-amber-950' },
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
