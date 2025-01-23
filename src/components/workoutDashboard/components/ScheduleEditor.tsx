"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Trash2, ArrowLeft } from "lucide-react"

type Exercise = {
  name: string
  sets: number
  reps: number
}

type ScheduleItem = {
  day: string
  category: string
  muscleGroup: string
  exercises: Exercise[]
}

type ScheduleEditorProps = {
  initialSchedule: ScheduleItem[]
  onSave: (schedule: ScheduleItem[]) => void
  onBack: () => void
}

export function ScheduleEditor({ initialSchedule, onSave, onBack }: ScheduleEditorProps) {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(initialSchedule)
  const [editingDay, setEditingDay] = useState<string | null>(null)
  const [newExercise, setNewExercise] = useState<Exercise>({ name: "", sets: 0, reps: 0 })

  const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]

  const handleAddExercise = (day: string) => {
    if (newExercise.name && newExercise.sets > 0 && newExercise.reps > 0) {
      setSchedule(
        schedule.map((item) => (item.day === day ? { ...item, exercises: [...item.exercises, newExercise] } : item)),
      )
      setNewExercise({ name: "", sets: 0, reps: 0 })
    }
  }

  const handleRemoveExercise = (day: string, exerciseIndex: number) => {
    setSchedule(
      schedule.map((item) =>
        item.day === day ? { ...item, exercises: item.exercises.filter((_, index) => index !== exerciseIndex) } : item,
      ),
    )
  }

  const handleSave = () => {
    onSave(schedule)
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <Button onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Dashboard
      </Button>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Editor de Cronograma de Treinos</h1>

      {days.map((day) => (
        <Card key={day} className="mb-4">
          <CardHeader>
            <CardTitle>{day}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exercício</TableHead>
                  <TableHead>Séries</TableHead>
                  <TableHead>Repetições</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule
                  .find((item) => item.day === day)
                  ?.exercises.map((exercise, index) => (
                    <TableRow key={index}>
                      <TableCell>{exercise.name}</TableCell>
                      <TableCell>{exercise.sets}</TableCell>
                      <TableCell>{exercise.reps}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveExercise(day, index)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <div className="mt-4 grid grid-cols-4 gap-2">
              <Input
                placeholder="Nome do exercício"
                value={newExercise.name}
                onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Séries"
                value={newExercise.sets || ""}
                onChange={(e) => setNewExercise({ ...newExercise, sets: Number.parseInt(e.target.value) })}
              />
              <Input
                type="number"
                placeholder="Repetições"
                value={newExercise.reps || ""}
                onChange={(e) => setNewExercise({ ...newExercise, reps: Number.parseInt(e.target.value) })}
              />
              <Button onClick={() => handleAddExercise(day)}>
                <Plus className="mr-2 h-4 w-4" /> Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleSave} className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white">
        Salvar Cronograma
      </Button>
    </div>
  )
}

