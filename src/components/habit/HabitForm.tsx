import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, Book, Coffee, Dumbbell, Music, Heart, Sun, Moon, Star, Cloud, Zap, Droplet, Flame, Leaf, Feather, Eye, Camera, Check, Bell, Gift, Target, } from 'lucide-react'

const icons = [
  { name: 'Activity', component: Activity },
  { name: 'Book', component: Book },
  { name: 'Coffee', component: Coffee },
  { name: 'Dumbbell', component: Dumbbell },
  { name: 'Music', component: Music },
  { name: 'Heart', component: Heart },
  { name: 'Sun', component: Sun },
  { name: 'Moon', component: Moon },
  { name: 'Star', component: Star },
  { name: 'Cloud', component: Cloud },
  { name: 'Zap', component: Zap },
  { name: 'Droplet', component: Droplet },
  { name: 'Flame', component: Flame },
  { name: 'Leaf', component: Leaf },
  { name: 'Feather', component: Feather },
  { name: 'Eye', component: Eye },
  { name: 'Camera', component: Camera },
  { name: 'Check', component: Check },
  { name: 'Bell', component: Bell },
  { name: 'Gift', component: Gift },
  { name: 'Target', component: Target }
];


const colors = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500',
  'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500',
  'bg-lime-500', 'bg-emerald-500', 'bg-sky-500', 'bg-violet-500', 'bg-fuchsia-500',
  'bg-rose-500', 'bg-amber-500', 'bg-gray-500', 'bg-slate-500', 'bg-zinc-500'
]

export default function HabitForm() {
  const [selectedIcon, setSelectedIcon] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [goalInterval, setGoalInterval] = useState('none')
  const [goalConclusions, setGoalConclusions] = useState(1);

  return (
    <ScrollArea className="h-[400px] pr-4">
      <form className="space-y-4">

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter habit name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Enter habit description" />
        </div>

        <div className="space-y-2">
          <label htmlFor="goal">Daily Goal</label>
          <div className="flex items-center space-x-2">
            <Input
              id="goal"
              value={goalConclusions + ' / Day'}
              readOnly
              className="w-full border rounded"
            />
            <button
              type="button"
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setGoalConclusions((prev) => Math.max(1, prev - 1))}
              disabled={goalConclusions <= 1}
            >
              -
            </button>
            <button
              type="button"
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setGoalConclusions((prev) => Math.min(36, prev + 1))}
              disabled={goalConclusions >= 36}
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-2">
  <Label>Select an icon</Label>
  <RadioGroup onValueChange={setSelectedIcon} className="grid grid-cols-7 gap-2">
    {icons.map((icon) => (
      <div key={icon.name}>
        <RadioGroupItem
          value={icon.name}
          id={`icon-${icon.name}`}
          className="peer sr-only"
        />
        <Label
          htmlFor={`icon-${icon.name}`}
          className="flex items-center justify-center rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          style={{ width: "40px", height: "40px" }}
        >
          <icon.component className="h-6 w-6" />
        </Label>
      </div>
    ))}
  </RadioGroup>
</div>

        <div className="space-y-2">
          <Label>Select a color</Label>
          <RadioGroup onValueChange={setSelectedColor} className="grid grid-cols-5 gap-2">
            {colors.map((color) => (
              <div key={color}>
                <RadioGroupItem
                  value={color}
                  id={`color-${color}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`color-${color}`}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-muted bg-popover hover:border-primary peer-data-[state=checked]:border-primary`}
                >
                  <div className={`h-6 w-6 rounded-full ${color}`} />
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Button type="submit" className="w-full">Save Habit</Button>
      </form>
    </ScrollArea>
  )
}