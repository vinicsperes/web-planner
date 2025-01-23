import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type ScheduleItem = {
  day: string
  category: string
  duration: number
}

type TrainingScheduleProps = {
  onScheduleSave: (schedule: ScheduleItem[]) => void
}

export function TrainingSchedule({ onScheduleSave }: TrainingScheduleProps) {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [newItem, setNewItem] = useState<ScheduleItem>({ day: "", category: "", duration: 0 })

  const handleAddItem = () => {
    if (newItem.day && newItem.category && newItem.duration) {
      setSchedule([...schedule, newItem])
      setNewItem({ day: "", category: "", duration: 0 })
    }
  }

  const handleSaveSchedule = () => {
    onScheduleSave(schedule)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Training Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedule.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>
                {item.day}: {item.category} ({item.duration} min)
              </span>
              <Button variant="destructive" onClick={() => setSchedule(schedule.filter((_, i) => i !== index))}>
                Remove
              </Button>
            </div>
          ))}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4">Add Schedule Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Schedule Item</DialogTitle>
              <DialogDescription>Add a new item to your training schedule.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="day" className="text-right">
                  Day
                </Label>
                <Select onValueChange={(value) => setNewItem({ ...newItem, day: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a day" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Cardio", "Strength", "Flexibility", "Balance"].map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration (min)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  className="col-span-3"
                  value={newItem.duration}
                  onChange={(e) => setNewItem({ ...newItem, duration: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddItem}>Add to Schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button className="mt-4" onClick={handleSaveSchedule}>
          Save Schedule
        </Button>
      </CardContent>
    </Card>
  )
}

