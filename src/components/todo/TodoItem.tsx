
'use client';

import { ITodo } from '@/server/models/Todo';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { toggleTodo, deleteTodo } from '@/server/actions';
import { cn } from '@/lib/utils';

import { Todo } from '@/types';

interface TodoItemProps {
    todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
    const [isPending, startTransition] = useTransition();

    const handleToggle = (checked: boolean) => {
        startTransition(async () => {
            await toggleTodo(todo._id, checked);
        });
    };

    const handleDelete = () => {
        startTransition(async () => {
            await deleteTodo(todo._id);
        });
    };

    return (
        <Card className={cn('mb-2', isPending && 'opacity-50')}>
            <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id={`todo-${todo._id}`}
                        checked={todo.completed}
                        onCheckedChange={handleToggle}
                        disabled={isPending}
                    />
                    <label
                        htmlFor={`todo-${todo._id}`}
                        className={cn(
                            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                            todo.completed && 'line-through text-muted-foreground'
                        )}
                    >
                        {todo.content}
                    </label>
                </div>
                <Button
                    variant="destructive"
                    size="icon"
                    onClick={handleDelete}
                    disabled={isPending}
                    className="h-8 w-8"
                >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                </Button>
            </CardContent>
        </Card>
    );
}
