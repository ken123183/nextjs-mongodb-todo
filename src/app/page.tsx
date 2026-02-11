
import { AddTodo } from '@/components/todo/AddTodo';
import { TodoList } from '@/components/todo/TodoList';

export default function Home() {
  return (
    <main className="container mx-auto max-w-2xl py-10 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">My Todo List</h1>
        <p className="text-muted-foreground">
          Built with Next.js 15, Server Actions & MongoDB
        </p>
      </div>

      <div className="bg-card rounded-xl border shadow-sm p-6">
        <AddTodo />
        <div className="my-6 border-t" />
        <TodoList />
      </div>
    </main>
  );
}
