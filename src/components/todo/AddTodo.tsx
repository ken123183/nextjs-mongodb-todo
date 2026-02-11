
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createTodo } from '@/server/actions';
import { useTransition } from 'react';

const todoSchema = z.object({
    content: z.string().min(1, 'Content is required').max(60, 'Max 60 chars'),
});

type TodoFormValues = z.infer<typeof todoSchema>;

export function AddTodo() {
    const [isPending, startTransition] = useTransition();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TodoFormValues>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            content: '',
        },
    });

    const onSubmit = (data: TodoFormValues) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append('content', data.content);
            const result = await createTodo(formData);

            if (result?.success) {
                reset();
            } else {
                // Handle server error if needed
                console.error(result?.error);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-2 mb-4">
            <div className="flex-1">
                <Input
                    {...register('content')}
                    placeholder="What needs to be done?"
                    disabled={isPending}
                    className={errors.content ? 'border-red-500' : ''}
                />
                {errors.content && (
                    <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
                )}
            </div>
            <Button type="submit" disabled={isPending}>
                {isPending ? 'Adding...' : 'Add'}
            </Button>
        </form>
    );
}
