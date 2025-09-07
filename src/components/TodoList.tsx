import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
import { Card, CardContent } from './ui/card';
import { CheckCircle2, Circle, Search } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  filter: string;
  searchQuery: string;
}

export const TodoList = ({ todos, onToggle, onDelete, onUpdate, filter, searchQuery }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            {searchQuery ? (
              <>
                <Search className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <div>
                  <h3 className="text-lg font-medium text-muted-foreground">No results found</h3>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    No todos match your search for "{searchQuery}"
                  </p>
                </div>
              </>
            ) : filter === 'completed' ? (
              <>
                <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <div>
                  <h3 className="text-lg font-medium text-muted-foreground">No completed todos</h3>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    Completed todos will appear here
                  </p>
                </div>
              </>
            ) : filter === 'active' ? (
              <>
                <Circle className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <div>
                  <h3 className="text-lg font-medium text-muted-foreground">No active todos</h3>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    All your todos are completed! 🎉
                  </p>
                </div>
              </>
            ) : (
              <>
                <Circle className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <div>
                  <h3 className="text-lg font-medium text-muted-foreground">No todos yet</h3>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    Add your first todo above to get started
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div key={todo.id} className="group">
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </div>
      ))}
    </div>
  );
};