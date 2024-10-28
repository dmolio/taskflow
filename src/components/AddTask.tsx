import React, { useState } from 'react';
import { Plus, Calendar, Tag as TagIcon } from 'lucide-react';
import { useStore } from '../store/useStore';
import { DatePicker } from './DatePicker';
import { TagSelector } from './TagSelector';

interface AddTaskProps {
  listId: string;
}

export const AddTask: React.FC<AddTaskProps> = ({ listId }) => {
  const [title, setTitle] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTagSelector, setShowTagSelector] = useState(false);
  const { addTask } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      priority: 'medium',
      dueDate: dueDate,
      tags: tags,
      createdAt: new Date(),
      list: listId
    });

    setTitle('');
    setDueDate(null);
    setTags([]);
    setShowForm(false);
  };

  const resetForm = () => {
    setTitle('');
    setDueDate(null);
    setTags([]);
    setShowForm(false);
    setShowDatePicker(false);
    setShowTagSelector(false);
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 w-full p-4 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>Add Task</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {dueDate && (
          <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
            Due: {dueDate.toLocaleDateString()}
          </span>
        )}
        {tags.map(tag => (
          <span key={tag} className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex flex-wrap justify-between mt-4">
        <div className="flex gap-2 relative">
          <button
            type="button"
            onClick={() => {
              setShowDatePicker(!showDatePicker);
              setShowTagSelector(false);
            }}
            className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
          >
            <Calendar className="w-5 h-5" />
          </button>
          {showDatePicker && (
            <DatePicker
              date={dueDate}
              onDateChange={setDueDate}
              onClose={() => setShowDatePicker(false)}
            />
          )}
          
          <button
            type="button"
            onClick={() => {
              setShowTagSelector(!showTagSelector);
              setShowDatePicker(false);
            }}
            className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
          >
            <TagIcon className="w-5 h-5" />
          </button>
          {showTagSelector && (
            <TagSelector
              tags={tags}
              onTagsChange={setTags}
              onClose={() => setShowTagSelector(false)}
            />
          )}
        </div>
        
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
};