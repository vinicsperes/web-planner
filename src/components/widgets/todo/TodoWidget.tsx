import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronUp, ChevronDown, Check, Plus, Trash2, SquareCheckBig, CornerDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task, useTodoList } from './hooks/useTodoList';
import { useState } from 'react';

interface TodoItemProps {
    task: Task;
    toggleTask: (id: string) => void;
    addTask: (content: string, parentId?: string) => void;
    moveTask: (id: string, direction: 'up' | 'down', parentId?: string) => void;
    removeTask: (id: string, parentId?: string) => void;
    level: number;
    parentId?: string;
}

const TodoItem = ({ task, toggleTask, addTask, moveTask, removeTask, level, parentId }: TodoItemProps) => {
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
        <motion.div
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`py-2 ${level > 0 ? 'ml-6' : ''}`}
        >
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
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-6 h-6 rounded-sm"
                        onClick={() => moveTask(task.id, 'up', parentId)}
                    >
                        <ChevronUp className="h-3 w-3" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-6 h-6 rounded-sm"
                        onClick={() => moveTask(task.id, 'down', parentId)}
                    >
                        <ChevronDown className="h-3 w-3" />
                    </Button>

                    {level === 0 && (
                        <Button
                            variant={'outline'}
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setIsAddingSubTodo((prev) => !prev)}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    )}
                    <Button
                        variant="destructive"
                        size="icon"
                        className="w-6 h-6 rounded-sm"
                        onClick={() => removeTask(task.id, parentId)}
                    >
                        <Trash2 />
                    </Button>
                </div>
            </div>
            <AnimatePresence>
                {task.subTasks.map((subTask) => (
                    <TodoItem
                        key={subTask.id}
                        task={subTask}
                        toggleTask={toggleTask}
                        addTask={addTask}
                        moveTask={moveTask}
                        removeTask={removeTask}
                        level={level + 1}
                        parentId={task.id}
                    />
                ))}
                {isAddingSubTodo && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex items-center space-x-2 mt-2 ${level > 0 ? 'ml-6' : ''}`}
                    >
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
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export const TodoWidget = () => {
    const { tasks, addTask, toggleTask, moveTask, removeTask } = useTodoList();
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            addTask(newTodo);
            setNewTodo('');
        }
    };

    return (
        <Card className="w-full max-w-md border bg-card dark:bg-card-dark rounded-xl">
            <CardHeader className='px-3 pb-0'>
                <CardTitle className='flex items-center justify-start gap-2'>
                    <SquareCheckBig/>
                    Cadastrar o nome da lista aqui
                </CardTitle>
                <Separator className="p" />
            </CardHeader>
            <CardContent className='p-3'>
                <motion.div layout className="space-y-1">
                    <AnimatePresence>
                        {tasks.map((task) => (
                            <TodoItem
                                key={task.id}
                                task={task}
                                toggleTask={toggleTask}
                                addTask={addTask}
                                moveTask={moveTask}
                                removeTask={removeTask}
                                level={0}
                            />
                        ))}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center space-x-2 mt-2"
                        >
                            <input
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="Add a new task..."
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && newTodo.trim()) handleAddTodo();
                                }}
                                className="border-b border-muted-foreground bg-transparent focus:outline-none text-sm flex-grow"
                            />
                            <Button
                                variant={'secondary'}
                                size="icon"
                                className="h-6 w-6"
                                onClick={handleAddTodo}
                            >
                                <Plus className='w-full h-full' />
                            </Button>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </CardContent>
        </Card>
    );
};