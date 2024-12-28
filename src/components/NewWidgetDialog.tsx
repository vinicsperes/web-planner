import { useState } from 'react'

import { FileText, Heading, Image, ListTodo, Music, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Habit, HabitFormData, colorVariants, habitColors as colors, habitIcons as icons } from '@/utils/habitData';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

type NewWidgetDialogProps = {
  onAddHabit: (habit: Habit) => void;
};

export default function NewWidgetDialog({ onAddHabit }: NewWidgetDialogProps) {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { isValid } } = useForm<HabitFormData>({
    defaultValues: {
      goal: 1,
      icon: icons[0].name || "",
      color: colors[0] || "",
    },
  });

  const onSubmit = (data: HabitFormData) => {
    const newHabit: Habit = {
      _id: uuidv4(),
      name: data.name,
      description: data.description,
      icon: data.icon,
      color: data.color,
      goal: data.goal,
      completedDates: {}
    }

    onAddHabit(newHabit)
    closeDialog()
  }

  const goal = watch('goal')

  const closeDialog = () => {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add item</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top" className="">
          <DialogTrigger className='w-full' >
            <DropdownMenuItem>
              <ListTodo className="mr-2 h-4 w-4" />
              <span>Habit</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Note</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Heading className="mr-2 h-4 w-4" />
            <span>Header</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Image className="mr-2 h-4 w-4" />
            <span>Image</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Music className="mr-2 h-4 w-4" />
            <span>Spotify</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[400px] sm:max-h-[900px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <p>Create a new Habit!</p>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 m-2">
            <div className="space-y-2">
              <Label htmlFor="name" className='text-zinc-300'>Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter habit name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className='text-zinc-300'>Description</Label>
              <Textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                placeholder="Enter habit description"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="goal" className='text-zinc-300'>Daily Goal</label>
              <div className="flex items-center space-x-2">
                <span className="w-full border rounded text-zinc-300 p-1 pl-2">{goal} / Day</span>
                <button
                  type="button"
                  className="px-3 py-1 border rounded disabled:opacity-50 text-zinc-300"
                  onClick={() => setValue('goal', goal - 1)}
                  disabled={goal <= 1}
                >
                  <span>-</span>
                </button>
                <button
                  type="button"
                  className="px-3 py-1 border rounded disabled:opacity-50 text-zinc-300"
                  onClick={() => setValue('goal', goal + 1)}
                  disabled={goal >= 36}
                >
                  <span>+</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className='text-zinc-300'>Select an icon</Label>
              <RadioGroup
                className="grid grid-cols-7 gap-2"
                onValueChange={(value) => setValue('icon', value)}
              >
                {icons.map((icon) => (
                  <div key={icon.name} className="flex justify-center items-center">
                    <RadioGroupItem
                      value={icon.name}
                      id={`icon-${icon.name}`}
                      className="peer hidden"
                    />
                    <Label
                      htmlFor={`icon-${icon.name}`}
                      className="flex items-center justify-center text-zinc-300 rounded-md border-2 border-zinc-900 bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <icon.component className="h-5 w-5" />
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className='text-zinc-300'>Select a color</Label>
              <RadioGroup
                className="grid grid-cols-7 gap-2"
                onValueChange={(value) => setValue('color', value)}
              >
                {colors.map((color) => (
                  <div key={color} className="flex justify-center items-center">
                    <RadioGroupItem
                      value={color}
                      id={`color-${color}`}
                      className="peer hidden"
                    />
                    <Label
                      htmlFor={`color-${color}`}
                      className="flex items-center justify-center rounded-md border-2 border-black bg-popover hover:border-primary peer-data-[state=checked]:border-primary cursor-pointer"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <div
                        className={`h-6 w-6 ${colorVariants[color]?.[400].bg} rounded-md m-1`}

                      />
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className={`w-full ${isValid ? 'bg-green-600 hover:bg-green-500' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!isValid}
            >
              Save Habit
            </Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
