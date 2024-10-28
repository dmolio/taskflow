import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, Circle, Clock, Tag, Trash2 } from 'lucide-react';
import { Task } from '../types/task';
import { useStore } from '../store/useStore';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTask, deleteTask } = useStore();

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => toggleTask(task.id)}
        className="text-gray-400 hover:text-blue-500 transition-colors"
      >
        {task.completed ? (
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        ) : (
          <Circle className="w-6 h-6" />
        )}
      </button>

      <div className="flex-1">
        <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
        )}
        <div className="flex gap-4 mt-2">
          {task.dueDate && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {format(new Date(task.dueDate), 'MMM d, yyyy')}
            </div>
          )}
          {task.tags.length > 0 && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Tag className="w-4 h-4" />
              {task.tags.join(', ')}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className={`px-2 py-1 rounded text-xs ${
          task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
          task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {task.priority}
        </span>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};