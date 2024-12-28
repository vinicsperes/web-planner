import { Check, Move } from "lucide-react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ButtonProps = {
    setIsDragEnabled: (value: any) => void
    isDragEnabled: boolean
}

export default function RearrangeWidgetsButton({ isDragEnabled, setIsDragEnabled }: ButtonProps) {
    return (
        <Button 
            size="icon"
            className="h-9 w-9"
            variant="ghost"
            onClick={() => setIsDragEnabled((prev: boolean) => !prev)}
            asChild
        >
            {isDragEnabled ?
                <>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Check className="w-4 h-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Finish Editing</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </>
                :
                <>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Move className="w-4 h-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Rearrange Widgets</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </>
            }
        </Button>
    )
}