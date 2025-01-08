import RearrangeWidgetsButton from './ components/RearrangeWidgetsButton'
import NewWidgetDialog from '../widgets/components/newWidgetDialog/NewWidgetDialog'
import { Habit } from '@/utils/habitData'

type FloatingMenuProps = {
    isDragEnabled: boolean
    setIsDragEnabled: (value: any) => void
    onAddHabit: (habit: Habit) => void;
}

export function FloatingMenu({ isDragEnabled, setIsDragEnabled, onAddHabit }: FloatingMenuProps) {
    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-background/80 dark:border backdrop-blur-sm rounded-lg p-2 shadow-lg z-50">
            <NewWidgetDialog onAddHabit={onAddHabit} />
            <RearrangeWidgetsButton isDragEnabled={isDragEnabled} setIsDragEnabled={setIsDragEnabled} />
        </div>
    )
}