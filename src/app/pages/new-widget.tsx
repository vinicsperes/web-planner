import { Button } from "@/components/ui/button"
import {
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import { Notebook, SquareCheck } from "lucide-react"

const widgetArray = [
    {
        name: 'Habit',
        icon:
        <SquareCheck
            size={48}
        />
    },
    {
        name: 'Notes',
        icon:
        <Notebook />
    }
]

export function NewWidgetDialog() {
    return (
        <div>
            <DialogTitle>
                <h1>New Widget</h1>
            </DialogTitle>
            <DialogDescription>
                <p>Insert a new widget to dashboard</p>
            </DialogDescription>

            <div className='grid grid-cols-3 gap-3'>
                {widgetArray.map((widget) => {
                    return (
                        <Button
                            className='w-full h-full flex-col p-8'
                        >
                            {widget.icon}
                            <h1>{widget.name}</h1>
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}
