import { CheckIcon, PlusIcon } from 'lucide-react';
import { Habit, habitIcons, colorVariants } from '../utils/habitData'
import { Heatmap } from './Heatmap'

interface HabitListProps {
    habits: Habit[]
    onUpdateHabitProgress: (habitId: string) => void
}

export function HabitList({ habits, onUpdateHabitProgress }: HabitListProps) {
    const today = new Date().toLocaleDateString()

    return (
        <div className="space-y-6">
            {habits.map((habit) => {
                const todayProgress = habit.completedDates[today] || 0

                const circleCircumference = 2 * Math.PI * 14
                const progressOffset = (circleCircumference * (habit.goal - todayProgress)) / habit.goal;

                const IconComponent = habitIcons.find(icon => icon.name === habit.icon)?.component as React.ElementType;
                
                return (
                    <div key={habit._id} className="space-y-2">
                        <div className="flex items-center gap-3 justify-between">
                            <div className='flex gap-3'>
                                <div className={`w-10 h-10 rounded-md flex items-center justify-center text-white text-xl ${colorVariants[habit.color][700]}`}>
                                    <IconComponent />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-gray-200 text-base">{habit.name}</span>
                                    <span className="text-gray-400 text-sm">{habit.description}</span>
                                </div>
                            </div>
                            <div className="relative w-12 h-12 flex justify-center items-center">
                                <svg className="absolute w-full h-full rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="18" cy="18" r="14" stroke="#d1d5db" strokeWidth="3" fill="none" />
                                </svg>

                                <svg className="absolute w-full h-full rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="14"
                                        stroke={todayProgress === habit.goal ? '#10b981' : '#3b82f6'}
                                        strokeWidth="3"
                                        fill="none"
                                        strokeDasharray={circleCircumference}
                                        strokeDashoffset={progressOffset}
                                        style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                                    />
                                </svg>

                                <button
                                    onClick={() => onUpdateHabitProgress(habit._id)}
                                    className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-lg focus:outline-none hover:bg-gray-500 z-10"
                                >
                                    {todayProgress === habit.goal ? <CheckIcon /> : <PlusIcon />}
                                </button>
                            </div>
                        </div>
                    
                        <Heatmap habit={habit} color={habit.color} />
                    </div>
                )
            })}
        </div>
    )
}
