import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export interface Task {
    id: string
    content: string
    completed: boolean
    subTasks: Task[]
}

export function useTodoList(initialTodos: Task[] = []) {
    const [tasks, setTodos] = useState<Task[]>(initialTodos)

    function addTask(content: string, parentId?: string) {
        const newTodo: Task = {
            id: uuidv4(),
            content,
            completed: false,
            subTasks: []
        }

        setTodos((prevTasks) => {
            if (!parentId) {
                return [...prevTasks, newTodo]
            }

            return prevTasks.map((task) => {
                if (task.id === parentId) {
                    return { ...task, subTasks: [...task.subTasks, newTodo] }
                }
                return task
            })
        })
    }

    function toggleTask(id: string) {
        setTodos((prevTasks: Task[]) => {
            const toggleTaskRecursive = (tasks: Task[]): Task[] => {
                return tasks.map((task) => {
                    if (task.id === id) {
                        const newCompleted = !task.completed
                        return {
                            ...task,
                            completed: newCompleted,
                            subTasks: task.subTasks.map(subTodo => ({ ...subTodo, completed: newCompleted }))
                        }
                    }
                    if (task.subTasks.length > 0) {
                        const updatedsubTasks = toggleTaskRecursive(task.subTasks)
                        const allsubTasksCompleted = updatedsubTasks.every(subTodo => subTodo.completed)
                        return { ...task, subTasks: updatedsubTasks, completed: allsubTasksCompleted }
                    }
                    return task
                })
            }

            return toggleTaskRecursive(prevTasks)
        })
    }
    
    function moveTask(id: string, direction: 'up' | 'down', parentId?: string) {
        setTodos((prevTasks) => {
            const moveTaskRecursive = (tasks: Task[]): Task[] => {
                const index = tasks.findIndex(task => task.id === id)
                if (index === -1) {
                    return tasks.map(task => ({
                        ...task,
                        subTasks: moveTaskRecursive(task.subTasks)
                    }))
                }

                const newIndex = direction === 'up' ? Math.max(0, index - 1) : Math.min(tasks.length - 1, index + 1)
                if (newIndex === index) return tasks

                const newTodos = [...tasks]
                const [removed] = newTodos.splice(index, 1)
                newTodos.splice(newIndex, 0, removed)
                return newTodos
            }

            if (!parentId) {
                return moveTaskRecursive(prevTasks)
            }

            return prevTasks.map(task => {
                if (task.id === parentId) {
                    return { ...task, subTasks: moveTaskRecursive(task.subTasks) }
                }
                return task
            })
        })
    }

    function removeTask(id: string, parentId?: string) {
        setTodos((prevTasks: Task[]) => {
            const removeTaskRecursive = (tasks: Task[]): Task[] => {
                return tasks.filter(task => task.id !== id).map(task => ({
                    ...task,
                    subTasks: removeTaskRecursive(task.subTasks),
                }))
            }
    
            if (!parentId) {
                return removeTaskRecursive(prevTasks)
            }
    
            return prevTasks.map(task => {
                if (task.id === parentId) {
                    return { ...task, subTasks: removeTaskRecursive(task.subTasks) }
                }
                return task
            })
        })
    }

    return { tasks, addTask, toggleTask, moveTask, removeTask }
}