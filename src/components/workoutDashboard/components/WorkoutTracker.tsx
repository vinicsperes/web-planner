"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Flame, BarChart2, Edit, Trash2, Plus, X, Dumbbell, Calendar, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScheduleEditor } from "./ScheduleEditor"
import fakeDatabase from "../../../utils/workoutDatabase.json"

export type Workout = {
  id: string
  date: string
  category: "Cardio" | "Strength" | "Flexibility" | "Balance"
  details: {
    cardio?: {
      activity: string
      duration: number
      distance?: number
      tags: string[]
    }
    strength?: {
      muscleGroup: string
      exercises: {
        name: string
        sets: number
        reps: number
        weight: number
      }[]
    }
    flexibility?: {
      activity: string
      duration: number
    }
  }
  tags: string[]
}

type ScheduleItem = {
  day: string
  category: string
  muscleGroup: string
  exercises: {
    name: string
    sets: number
    reps: number
  }[]
}

const initialSchedule: ScheduleItem[] = [
  {
    day: "Segunda",
    category: "Strength",
    muscleGroup: "Peito",
    exercises: [
      { name: "Supino", sets: 3, reps: 10 },
      { name: "Crucifixo", sets: 3, reps: 12 },
      { name: "Flexões", sets: 3, reps: 15 },
    ],
  },
  {
    day: "Quarta",
    category: "Strength",
    muscleGroup: "Costas",
    exercises: [
      { name: "Levantamento Terra", sets: 3, reps: 8 },
      { name: "Barra Fixa", sets: 3, reps: 10 },
      { name: "Remada", sets: 3, reps: 12 },
    ],
  },
  {
    day: "Sexta",
    category: "Strength",
    muscleGroup: "Pernas",
    exercises: [
      { name: "Agachamento", sets: 3, reps: 10 },
      { name: "Leg Press", sets: 3, reps: 12 },
      { name: "Avanço", sets: 3, reps: 15 },
    ],
  },
]

export default function WorkoutTracker() {
  const [workouts, setWorkouts] = useState<Workout[]>(fakeDatabase.workouts)
  const [newWorkout, setNewWorkout] = useState<Partial<Workout>>({
    category: "Cardio",
    details: { cardio: { activity: "", duration: 0, tags: [] } },
    tags: [],
  })
  const [schedule, setSchedule] = useState<ScheduleItem[]>(fakeDatabase.schedule)
  const [streak, setStreak] = useState(0)
  const [newTag, setNewTag] = useState("")
  const [showScheduleEditor, setShowScheduleEditor] = useState(false)
  const [selectedScheduleItem, setSelectedScheduleItem] = useState<ScheduleItem | null>(null)

  useEffect(() => {
    calculateStreak()
  }, [workouts])

  const calculateStreak = () => {
    let currentStreak = 0
    const sortedWorkouts = [...workouts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    for (let i = 0; i < sortedWorkouts.length; i++) {
      const currentDate = new Date(sortedWorkouts[i].date)
      const previousDate = i > 0 ? new Date(sortedWorkouts[i - 1].date) : new Date()

      const diffDays = Math.floor((previousDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24))

      if (diffDays <= 1) {
        currentStreak++
      } else {
        break
      }
    }

    setStreak(currentStreak)
  }

  const handleAddWorkout = () => {
    if (newWorkout.date && newWorkout.category) {
      setWorkouts([...workouts, { ...newWorkout, id: Date.now().toString() } as Workout])
      setNewWorkout({ category: "Cardio", details: { cardio: { activity: "", duration: 0, tags: [] } }, tags: [] })
    }
  }

  const handleDeleteWorkout = (id: string) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id))
  }

  const handleAddTag = () => {
    if (newTag && !newWorkout.tags?.includes(newTag)) {
      setNewWorkout({
        ...newWorkout,
        tags: [...(newWorkout.tags || []), newTag],
        details: {
          ...newWorkout.details,
          cardio: {
            ...newWorkout.details?.cardio,
            tags: [...(newWorkout.details?.cardio?.tags || []), newTag],
          },
        },
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setNewWorkout({
      ...newWorkout,
      tags: newWorkout.tags?.filter((t) => t !== tag),
      details: {
        ...newWorkout.details,
        cardio: {
          ...newWorkout.details?.cardio,
          tags: newWorkout.details?.cardio?.tags?.filter((t) => t !== tag),
        },
      },
    })
  }

  const handleSaveSchedule = (newSchedule: ScheduleItem[]) => {
    setSchedule(newSchedule)
    setShowScheduleEditor(false)
  }

  const handleSelectScheduleItem = (item: ScheduleItem) => {
    setSelectedScheduleItem(item)
    setNewWorkout({
      category: "Strength",
      details: {
        strength: {
          muscleGroup: item.muscleGroup,
          exercises: item.exercises.map((exercise) => ({ ...exercise, weight: 0 })),
        },
      },
      tags: [],
    })
  }

  if (showScheduleEditor) {
    return (
      <ScheduleEditor
        initialSchedule={schedule}
        onSave={handleSaveSchedule}
        onBack={() => setShowScheduleEditor(false)}
      />
    )
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Streak Widget */}
        <Card className="col-span-1">
          <CardContent className="pt-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Flame className="h-12 w-12 text-orange-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Sequência atual</p>
                <p className="text-4xl font-bold text-gray-800">{streak} dias</p>
              </div>
            </div>
            <Progress value={streak} max={30} className="w-24 h-2" />
          </CardContent>
        </Card>

        {/* Total Workouts Card */}
        <Card className="col-span-1">
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total de Treinos</p>
              <p className="text-4xl font-bold text-gray-800">{workouts.length}</p>
            </div>
            <BarChart2 className="h-12 w-12 text-blue-500" />
          </CardContent>
        </Card>

        {/* Quick Add Workout Card */}
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Adicionar Treino Rápido</h3>
            <div className="flex space-x-2">
              <Select
                value={newWorkout.category}
                onValueChange={(value: "Cardio" | "Strength" | "Flexibility" | "Balance") =>
                  setNewWorkout({
                    ...newWorkout,
                    category: value,
                  })
                }
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardio">Cardio</SelectItem>
                  <SelectItem value="Strength">Força</SelectItem>
                  <SelectItem value="Flexibility">Flexibilidade</SelectItem>
                  <SelectItem value="Balance">Equilíbrio</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddWorkout} className="bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="h-4 w-4 mr-2" /> Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Workout Schedule Card */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-gray-800">
              <div className="flex items-center">
                <Calendar className="mr-2" />
                Cronograma de Treinos
              </div>
              <Button onClick={() => setShowScheduleEditor(true)} variant="outline">
                Editar Cronograma
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {schedule.map((item, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow">
                  <h4 className="font-semibold mb-2 text-gray-800">
                    {item.day} - {item.muscleGroup}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {item.exercises.map((exercise, idx) => (
                      <li key={idx}>
                        {exercise.name}: {exercise.sets}x{exercise.reps}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleSelectScheduleItem(item)}
                    className="mt-2 text-blue-500 hover:text-blue-600"
                    variant="link"
                  >
                    Registrar Treino
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Workouts Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <Dumbbell className="mr-2" />
              Treinos Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {workouts
                .slice(-3)
                .reverse()
                .map((workout) => (
                  <li key={workout.id} className="bg-white p-2 rounded shadow flex justify-between items-center">
                    <span className="text-gray-700">
                      {workout.category} - {workout.date}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteWorkout(workout.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>

        {/* Add Workout Form Card */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-gray-800">Adicionar Novo Treino</CardTitle>
            <CardDescription>Preencha os detalhes do seu treino abaixo</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAddWorkout()
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newWorkout.date || ""}
                    onChange={(e) => setNewWorkout({ ...newWorkout, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={newWorkout.category}
                    onValueChange={(value: "Cardio" | "Strength" | "Flexibility" | "Balance") =>
                      setNewWorkout({
                        ...newWorkout,
                        category: value,
                        details:
                          value === "Cardio"
                            ? { cardio: { activity: "", duration: 0, tags: [] } }
                            : { strength: { muscleGroup: "", exercises: [] } },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardio">Cardio</SelectItem>
                      <SelectItem value="Strength">Força</SelectItem>
                      <SelectItem value="Flexibility">Flexibilidade</SelectItem>
                      <SelectItem value="Balance">Equilíbrio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {newWorkout.category === "Cardio" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity">Atividade</Label>
                    <Input
                      id="activity"
                      value={newWorkout.details?.cardio?.activity || ""}
                      onChange={(e) =>
                        setNewWorkout({
                          ...newWorkout,
                          details: {
                            cardio: {
                              ...newWorkout.details?.cardio,
                              activity: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração (minutos)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newWorkout.details?.cardio?.duration || ""}
                      onChange={(e) =>
                        setNewWorkout({
                          ...newWorkout,
                          details: {
                            cardio: {
                              ...newWorkout.details?.cardio,
                              duration: Number.parseInt(e.target.value),
                            },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {newWorkout.tags?.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                          <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id="tags"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Adicionar tag"
                      />
                      <Button type="button" onClick={handleAddTag} className="bg-blue-500 hover:bg-blue-600 text-white">
                        <Tag className="h-4 w-4 mr-2" /> Adicionar Tag
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {newWorkout.category === "Strength" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="muscleGroup">Grupo Muscular</Label>
                    <Select
                      value={newWorkout.details?.strength?.muscleGroup}
                      onValueChange={(value) =>
                        setNewWorkout({
                          ...newWorkout,
                          details: {
                            strength: {
                              muscleGroup: value,
                              exercises: schedule.find((s) => s.muscleGroup === value)?.exercises || [],
                            },
                          },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um grupo muscular" />
                      </SelectTrigger>
                      <SelectContent>
                        {schedule.map((item, index) => (
                          <SelectItem key={index} value={item.muscleGroup}>
                            {item.muscleGroup}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {newWorkout.details?.strength?.exercises.map((exercise, index) => (
                    <div key={index} className="space-y-2">
                      <p className="font-medium text-gray-700">{exercise.name}</p>
                      <div className="grid grid-cols-3 gap-2">
                        <Input
                          type="number"
                          placeholder="Séries"
                          value={exercise.sets}
                          onChange={(e) => {
                            const updatedExercises = [...newWorkout.details.strength!.exercises]
                            updatedExercises[index] = { ...exercise, sets: Number.parseInt(e.target.value) }
                            setNewWorkout({
                              ...newWorkout,
                              details: {
                                strength: {
                                  ...newWorkout.details.strength!,
                                  exercises: updatedExercises,
                                },
                              },
                            })
                          }}
                        />
                        <Input
                          type="number"
                          placeholder="Repetições"
                          value={exercise.reps}
                          onChange={(e) => {
                            const updatedExercises = [...newWorkout.details.strength!.exercises]
                            updatedExercises[index] = { ...exercise, reps: Number.parseInt(e.target.value) }
                            setNewWorkout({
                              ...newWorkout,
                              details: {
                                strength: {
                                  ...newWorkout.details.strength!,
                                  exercises: updatedExercises,
                                },
                              },
                            })
                          }}
                        />
                        <Input
                          type="number"
                          placeholder="Peso (kg)"
                          value={exercise.weight}
                          onChange={(e) => {
                            const updatedExercises = [...newWorkout.details.strength!.exercises]
                            updatedExercises[index] = { ...exercise, weight: Number.parseFloat(e.target.value) }
                            setNewWorkout({
                              ...newWorkout,
                              details: {
                                strength: {
                                  ...newWorkout.details.strength!,
                                  exercises: updatedExercises,
                                },
                              },
                            })
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
                <Plus className="h-4 w-4 mr-2" /> Salvar Treino
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Workout List Card */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="text-gray-800">Lista de Treinos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Detalhes</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workouts.map((workout) => (
                  <TableRow key={workout.id}>
                    <TableCell>{workout.date}</TableCell>
                    <TableCell>{workout.category}</TableCell>
                    <TableCell>
                      {workout.category === "Cardio" && workout.details.cardio
                        ? `${workout.details.cardio.activity} - ${workout.details.cardio.duration} min`
                        : workout.details.strength
                          ? `${workout.details.strength.muscleGroup} - ${workout.details.strength.exercises.length} exercícios`
                          : ""}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {workout.tags?.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="mr-2">
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteWorkout(workout.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

