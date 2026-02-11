
import { getTodos } from '@/server/actions';
import { TodoItem } from './TodoItem';
import { Todo } from '@/types';

export async function TodoList() {
    const todos = await getTodos();

    if (todos.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-10">
                No todos yet. Add one above!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {todos.map((todo: Todo) => (
                <TodoItem key={todo._id} todo={todo} />
            ))}
        </div>
    );
}
