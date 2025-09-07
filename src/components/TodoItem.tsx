import { useState } from 'react';
import { Todo } from '../types/todo';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Trash2, Edit2, Save, X, Clock, AlertCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editPriority, setEditPriority] = useState(todo.priority);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
        priority: editPriority,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-todo-priority-high text-white';
      case 'medium': return 'bg-todo-priority-medium text-white';
      case 'low': return 'bg-todo-priority-low text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="h-3 w-3" />;
      case 'medium': return <Clock className="h-3 w-3" />;
      case 'low': return null;
      default: return null;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${
      todo.completed ? 'bg-muted/30' : 'bg-background'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            className="mt-1 data-[state=checked]:bg-success data-[state=checked]:border-success"
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="font-medium"
                  autoFocus
                />
                <Textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Add description..."
                  className="min-h-[60px] resize-none"
                />
                <div className="flex items-center gap-2">
                  <Select value={editPriority} onValueChange={(value: 'high' | 'medium' | 'low') => setEditPriority(value)}>
                    <SelectTrigger className="w-24 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high" className="text-todo-priority-high">High</SelectItem>
                      <SelectItem value="medium" className="text-todo-priority-medium">Medium</SelectItem>
                      <SelectItem value="low" className="text-todo-priority-low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleCancel}>
                    <X className="h-3 w-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Title and Priority */}
                <div className="flex items-center gap-2">
                  <h3 className={`font-medium transition-all duration-200 ${
                    todo.completed 
                      ? 'line-through text-muted-foreground' 
                      : 'text-foreground'
                  }`}>
                    {todo.title}
                  </h3>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs px-2 py-0.5 ${getPriorityColor(todo.priority)}`}
                  >
                    {getPriorityIcon(todo.priority)}
                    {todo.priority}
                  </Badge>
                </div>

                {/* Description */}
                {todo.description && (
                  <p className={`text-sm transition-all duration-200 ${
                    todo.completed 
                      ? 'line-through text-muted-foreground/70' 
                      : 'text-muted-foreground'
                  }`}>
                    {todo.description}
                  </p>
                )}

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Created {formatDate(todo.createdAt)}</span>
                  {todo.updatedAt.getTime() !== todo.createdAt.getTime() && (
                    <span>Updated {formatDate(todo.updatedAt)}</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          {!isEditing && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(todo.id)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};