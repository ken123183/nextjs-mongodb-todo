
'use server';

import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/db';
import Todo from '@/server/models/Todo';
import { z } from 'zod';

// Zod schema for input validation
const CreateTodoSchema = z.object({
    content: z.string().min(1, 'Content is required').max(60, 'Start small, 60 chars max'),
});

export async function getTodos() {
    await connectToDatabase();
    try {
        const todos = await Todo.find({}).sort({ createdAt: -1 }).lean();
        // Convert _id and dates to string/number to be passed to client components if needed
        // or just return as is for server components (though plain objects are safer)
        return JSON.parse(JSON.stringify(todos));
    } catch (error) {
        console.error('Failed to fetch todos:', error);
        return [];
    }
}

export async function createTodo(formData: FormData) {
    await connectToDatabase();

    const rawData = {
        content: formData.get('content'),
    };

    const validation = CreateTodoSchema.safeParse(rawData);

    if (!validation.success) {
        return {
            error: validation.error.flatten().fieldErrors,
        };
    }

    try {
        await Todo.create({ content: validation.data.content });
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to create todo:', error);
        return { error: 'Failed to create todo' };
    }
}

export async function toggleTodo(id: string, completed: boolean) {
    await connectToDatabase();
    try {
        await Todo.findByIdAndUpdate(id, { completed });
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to toggle todo:', error);
        return { error: 'Failed to toggle todo' };
    }
}

export async function deleteTodo(id: string) {
    await connectToDatabase();
    try {
        await Todo.findByIdAndDelete(id);
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete todo:', error);
        return { error: 'Failed to delete todo' };
    }
}
