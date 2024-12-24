import { Check, Move } from "lucide-react";
import { Button } from "./ui/button";

type ButtonProps = {
    setIsDragEnabled: (value: any) => void
    isDragEnabled: boolean
}

export default function RearrangeWidgetsButton({ isDragEnabled, setIsDragEnabled }: ButtonProps) {
    return (
        <Button className="flex justify-evenly" variant="outline" onClick={() => setIsDragEnabled((prev: boolean) => !prev)}>
            {isDragEnabled ?
                <>
                    <span>Finish Editing</span>
                    <Check className="w-5 h-5 mr-2" />
                </>
                :
                <>
                    <span>Rearrange Widgets</span>
                    <Move className="w-5 h-5 mr-2" />
                </>
            }
        </Button>
    )
}