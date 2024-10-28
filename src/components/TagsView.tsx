import React from 'react';
import { Task } from '../types/task';

interface TagsViewProps {
  tasks: Task[];
}

export const TagsView: React.FC<TagsViewProps> = ({ tasks }) => {
  const allTags = Array.from(
    new Set(tasks.flatMap(task => task.tags))
  ).sort();

  return (
    <div className="space-y-6">
      {allTags.map(tag => (
        <div key={tag} className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            {tag}
          </h3>
          
          <div className="space-y-2">
            {tasks
              .filter(task => task.tags.includes(tag))
              .map(task => (
                <div
                  key={task.id}
                  className="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <span className={task.completed ? 'line-through text-gray-400' : ''}>
                      {task.title}
                    </span>
                    {task.dueDate && (
                      <span className="text-sm text-gray-500 ml-2">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
          </div>
        </div>
      ))}

      {allTags.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No tags created yet. Add tags to your tasks to see them here.
        </div>
      )}
    </div>
  );
};