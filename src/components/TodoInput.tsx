import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';

interface TodoInputProps {
  onAddTodo: (title: string, description?: string, priority?: 'high' | 'medium' | 'low') => void;
}

export const TodoInput = ({ onAddTodo }: TodoInputProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title, description || undefined, priority);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setShowAdvanced(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-todo-priority-high';
      case 'medium': return 'text-todo-priority-medium';
      case 'low': return 'text-todo-priority-low';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Add New Todo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 text-base"
              autoFocus
            />
            <Button 
              type="submit" 
              size="icon"
              className="bg-gradient-to-r from-primary to-primary-hover hover:shadow-lg transition-all duration-200"
              disabled={!title.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showAdvanced ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Less options
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  More options
                </>
              )}
            </Button>
            
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-muted-foreground">Priority:</span>
              <Select value={priority} onValueChange={(value: 'high' | 'medium' | 'low') => setPriority(value)}>
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
          </div>

          {showAdvanced && (
            <div className="space-y-3 pt-2 border-t">
              <Textarea
                placeholder="Add a description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};