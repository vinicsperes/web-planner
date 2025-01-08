import { Check, Hand, Move } from "lucide-react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";
import { toast } from "sonner";

type ButtonProps = {
    setIsDragEnabled: (value: any) => void
    isDragEnabled: boolean
}

export default function RearrangeWidgetsButton({ isDragEnabled, setIsDragEnabled }: ButtonProps) {
    function handleMoveClick() {
        setIsDragEnabled((prev: boolean) => {
            const newValue = !prev;
            toast(newValue ? "Drag enabled" : "Drag disabled", {
                description: (
                    <span>
                        {newValue ?
                            <span className="flex gap-1">Move items freely <Hand className="w-4 h-4" /></span>
                            :
                            <span className="flex gap-1">Editing completed <Check className="w-4 h-4" /></span>
                        }
                    </span>
                ),
            });
            return newValue;
        });
    };

    return (
        <Button
            size="icon"
            className="h-9 w-9"
            variant="ghost"
            onClick={handleMoveClick}
        >
            {isDragEnabled ?
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
                :
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
            }
        </Button >
    )
}