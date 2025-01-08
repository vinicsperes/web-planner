import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Plus, SquareCheckBig } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useTodoList } from './hooks/useTodoList';
import TodoItem from './TodoItem';

export default function TodoWidget() {
    const { tasks, addTask, toggleTask, moveTask, removeTask } = useTodoList();
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            addTask(newTodo);
            setNewTodo('');
        }
    };

    return (
        <Card className="card-content border bg-card dark:bg-card-dark rounded-xl">
            <CardHeader className='p-3 pb-0'>
                <CardTitle className='flex items-center justify-start gap-2'>
                    <SquareCheckBig />
                    Cadastrar o nome da lista aqui
                </CardTitle>
                <Separator className="p" />
            </CardHeader>
            <CardContent className='p-3'>
                <ScrollArea className="pr-3">
                    <div className="space-y-3 max-h-[26rem]">
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
                        <div className="flex items-center space-x-2 mt-2">
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
                        </div>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};
