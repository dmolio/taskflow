export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  tags: string[];
  createdAt: Date;
  list: string;
}

export interface TaskList {
  id: string;
  name: string;
  color: string;
}