
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/db';
import Todo from '@/server/models/Todo';
import { createTodo, getTodos, toggleTodo, deleteTodo } from '@/server/actions';
import type { Todo as TodoType } from '@/types';

describe('Todo CRUD Integration', () => {
    // Connect to DB before tests
    beforeAll(async () => {
        await connectToDatabase();
    });

    // Cleanup DB after tests
    afterAll(async () => {
        await Todo.deleteMany({}); // Clean up all todos created during test
        await mongoose.connection.close();
    });

    let createdTodoId: string;

    it('should create a new todo', async () => {
        const formData = new FormData();
        formData.append('content', 'Integration Test Todo');

        const result = await createTodo(formData);
        expect(result.success).toBe(true);

        const todos = await getTodos();
        const createdTodo = todos.find((t: TodoType) => t.content === 'Integration Test Todo');
        expect(createdTodo).toBeDefined();
        createdTodoId = createdTodo._id;
    });

    it('should read todos', async () => {
        const todos = await getTodos();
        expect(todos.length).toBeGreaterThan(0);
        expect(todos[0].content).toBeDefined();
    });

    it('should toggle todo completion', async () => {
        const result = await toggleTodo(createdTodoId, true);
        expect(result.success).toBe(true);

        const todos = await getTodos();
        const updatedTodo = todos.find((t: TodoType) => t._id === createdTodoId);
        expect(updatedTodo?.completed).toBe(true);
    });

    it('should delete todo', async () => {
        const result = await deleteTodo(createdTodoId);
        expect(result.success).toBe(true);

        const todos = await getTodos();
        const deletedTodo = todos.find((t: TodoType) => t._id === createdTodoId);
        expect(deletedTodo).toBeUndefined();
    });
});
