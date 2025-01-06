import { ReactNode } from "react"

interface DragWidgetProps {
    itemId: string
    isDragEnabled: boolean
    children: ReactNode
}

export function DraggableWidget({ itemId, isDragEnabled, children }: DragWidgetProps) {
    return (
        <div className={`${isDragEnabled ? "cursor-grab active:cursor-grabbing" : ""}`} key={itemId}>
            <div className={`${isDragEnabled && "pointer-events-none"}`}>
                {children}
            </div>
        </div>
    )
}