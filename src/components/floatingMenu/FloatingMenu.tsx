import { Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Habit } from '@/utils/habitData'

import ThemeToggle from './actions/ThemeToggle'
import RearrangeWidgetsButton from './actions/RearrangeWidgetsButton'
import NewHabitDialog from '../NewWidgetDialog'

type FloatingMenuProps = {
    isDragEnabled: boolean
    setIsDragEnabled: (value: any) => void
    onAddHabit: (habit: Habit) => void;
}

export function FloatingMenu({ isDragEnabled, setIsDragEnabled, onAddHabit }: FloatingMenuProps) {
    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-background/80 dark:border backdrop-blur-sm rounded-lg p-2 shadow-lg z-50">
            
            <NewHabitDialog onAddHabit={onAddHabit} />

            <RearrangeWidgetsButton isDragEnabled={isDragEnabled} setIsDragEnabled={setIsDragEnabled} />

            <ThemeToggle />

            <Button variant="ghost" size="icon" className="h-9 w-9">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
            </Button>
        </div>
    )
}