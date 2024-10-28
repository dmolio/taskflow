import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { Task } from '../types/task';

interface CalendarViewProps {
  tasks: Task[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ tasks }) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="text-xl font-semibold mb-4">
        {format(today, 'MMMM yyyy')}
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map(day => {
          const dayTasks = tasks.filter(task => 
            task.dueDate && isSameDay(new Date(task.dueDate), day)
          );

          return (
            <div
              key={day.toISOString()}
              className={`min-h-[100px] p-2 border rounded-lg ${
                isSameDay(day, today)
                  ? 'bg-blue-50 border-blue-200'
                  : 'border-gray-200'
              }`}
            >
              <div className="text-sm font-medium mb-1">
                {format(day, 'd')}
              </div>
              <div className="space-y-1">
                {dayTasks.map(task => (
                  <div
                    key={task.id}
                    className="text-xs p-1 rounded bg-gray-100 truncate"
                    title={task.title}
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};