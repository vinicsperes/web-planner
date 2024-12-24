import { ReactNode } from "react"

interface DragWidgetProps {
    itemId: string
    isDragEnabled: boolean
    children: ReactNode
}

export function DraggableWidget({ itemId, isDragEnabled, children }: DragWidgetProps) {
    return (
        <div className={`item bg-gray-900 ${isDragEnabled ? "cursor-grab active:cursor-grabbing" : ""}`} data-swapy-item={itemId} key={itemId}>
            <div className={`${isDragEnabled && "pointer-events-none"}`}>
                {children}
            </div>
        </div>
    )
}
