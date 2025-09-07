import { FilterType } from '../types/todo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Search, Trash2 } from 'lucide-react';

interface TodoFiltersProps {
  filter: FilterType;
  searchQuery: string;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
  onFilterChange: (filter: FilterType) => void;
  onSearchChange: (query: string) => void;
  onClearCompleted: () => void;
}

export const TodoFilters = ({
  filter,
  searchQuery,
  stats,
  onFilterChange,
  onSearchChange,
  onClearCompleted
}: TodoFiltersProps) => {
  const filterButtons = [
    { key: 'all' as FilterType, label: 'All', count: stats.total },
    { key: 'active' as FilterType, label: 'Active', count: stats.active },
    { key: 'completed' as FilterType, label: 'Completed', count: stats.completed },
  ];

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search todos..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1 bg-muted rounded-lg p-1">
              {filterButtons.map(({ key, label, count }) => (
                <Button
                  key={key}
                  variant={filter === key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onFilterChange(key)}
                  className={`relative px-3 py-1.5 text-sm transition-all duration-200 ${
                    filter === key 
                      ? 'bg-background shadow-sm text-foreground hover:bg-primary hover:text-primary-foreground' 
                      : 'hover:bg-primary hover:text-primary-foreground'
                  }`}
                >
                  {label}
                  {count > 0 && (
                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                      filter === key 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted-foreground/10 text-muted-foreground'
                    }`}>
                      {count}
                    </span>
                  )}
                </Button>
              ))}
            </div>

            {/* Clear Completed */}
            {stats.completed > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearCompleted}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear completed
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="text-center text-sm text-muted-foreground">
            {stats.total === 0 ? (
              "No todos yet. Add one above!"
            ) : (
              `${stats.active} of ${stats.total} tasks remaining`
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};