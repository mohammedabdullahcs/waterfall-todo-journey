import { TodoInput } from './TodoInput';
import { TodoFilters } from './TodoFilters';
import { TodoList } from './TodoList';
import { useTodos } from '../hooks/useTodos';
import { CheckSquare, Sparkles } from 'lucide-react';

export const TodoApp = () => {
  const {
    todos,
    filter,
    searchQuery,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    setFilter,
    setSearchQuery,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary-hover shadow-lg">
              <CheckSquare className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              SimpleTodo
            </h1>
            <Sparkles className="h-6 w-6 text-primary/60" />
          </div>
          <p className="text-muted-foreground text-lg">
            Organize your life, one task at a time
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <TodoInput onAddTodo={addTodo} />
          
          <TodoFilters
            filter={filter}
            searchQuery={searchQuery}
            stats={stats}
            onFilterChange={setFilter}
            onSearchChange={setSearchQuery}
            onClearCompleted={clearCompleted}
          />
          
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
            filter={filter}
            searchQuery={searchQuery}
          />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Built with ❤️ for CS students | Following the Waterfall methodology
          </p>
          <p className="mt-1">
            University Project - Software Engineering Fundamentals
          </p>
        </footer>
      </div>
    </div>
  );
};