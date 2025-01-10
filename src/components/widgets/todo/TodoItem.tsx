import { useState } from "react";
import { Task } from "./hooks/useTodoList";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Check, CornerDownRight, Plus, Trash2, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TodoItemProps {
    task: Task;
    toggleTask: (id: string) => void;
    addTask: (content: string, parentId?: string) => void;
    removeTask: (id: string, parentId?: string) => void;
    level: number;
    parentId?: string;
}

export default function TodoItem({ task, toggleTask, addTask, removeTask, level, parentId }: TodoItemProps) {
    const [newSubTodo, setNewSubTodo] = useState('');
    const [isAddingSubTodo, setIsAddingSubTodo] = useState(false);

    const handleAddSubTodo = () => {
        if (newSubTodo.trim()) {
            addTask(newSubTodo, task.id);
            setNewSubTodo('');
            setIsAddingSubTodo(false);
        }
    };

    return (
        <div className={`space-y-1 ${level > 0 ? 'ml-6' : ''}`}>
            <div className="flex items-center space-x-2">
                <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <span className={`flex-grow text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.content}
                </span>
                <div className="flex space-x-1">
                    {level === 0 ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => setIsAddingSubTodo((prev) => !prev)}
                                    className="flex items-center space-x-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>Add Task</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => removeTask(task.id, parentId)}
                                    className="flex items-center space-x-2"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span>Remove Task</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            variant="destructive"
                            size="icon"
                            className="w-6 h-6 rounded-sm"
                            onClick={() => removeTask(task.id, parentId)}
                        >
                            <Trash2 />
                        </Button>
                    )}
                </div>
            </div>
            {task.subTasks.map((subTask) => (
                <TodoItem
                    key={subTask.id}
                    task={subTask}
                    toggleTask={toggleTask}
                    addTask={addTask}
                    removeTask={removeTask}
                    level={level + 1}
                    parentId={task.id}
                />
            ))}
            {isAddingSubTodo && (
                <div className={`flex items-center ${level > 0 ? 'ml-6' : ''}`}>
                    <CornerDownRight />
                    <input
                        value={newSubTodo}
                        onChange={(e) => setNewSubTodo(e.target.value)}
                        placeholder="Add subtask..."
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && newSubTodo.trim()) handleAddSubTodo();
                        }}
                        className="ml-6 border-b border-muted-foreground bg-transparent focus:outline-none text-sm flex-grow"
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={handleAddSubTodo}
                    >
                        <Check className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}