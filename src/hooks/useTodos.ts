import { useState, useEffect, useCallback } from 'react';
import { Todo, FilterType } from '../types/todo';
import { loadTodos, saveTodos } from '../utils/storage';
import { useToast } from './use-toast';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Load todos from localStorage on mount
  useEffect(() => {
    const loadedTodos = loadTodos();
    setTodos(loadedTodos);
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = useCallback((title: string, description?: string, priority: 'high' | 'medium' | 'low' = 'medium') => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Todo title cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description?.trim(),
      completed: false,
      priority,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTodos(prev => [newTodo, ...prev]);
    toast({
      title: "Success",
      description: "Todo added successfully",
    });
  }, [toast]);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
        : todo
    ));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    toast({
      title: "Deleted",
      description: "Todo removed successfully",
    });
  }, [toast]);

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, ...updates, updatedAt: new Date() }
        : todo
    ));
  }, []);

  const clearCompleted = useCallback(() => {
    const completedCount = todos.filter(todo => todo.completed).length;
    setTodos(prev => prev.filter(todo => !todo.completed));
    
    if (completedCount > 0) {
      toast({
        title: "Cleared",
        description: `${completedCount} completed todo${completedCount === 1 ? '' : 's'} removed`,
      });
    }
  }, [todos, toast]);

  // Filter and search todos
  const filteredTodos = todos.filter(todo => {
    // Apply status filter
    const statusMatch = filter === 'all' || 
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);

    // Apply search filter
    const searchMatch = !searchQuery || 
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && searchMatch;
  });

  // Statistics
  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  };

  return {
    todos: filteredTodos,
    allTodos: todos,
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
  };
};