import React from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  date: Date | null;
  onDateChange: (date: Date | null) => void;
  onClose: () => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ date, onDateChange, onClose }) => {
  return (
    <div className="absolute left-0 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700">Select Due Date</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <input 
        type="datetime-local"
        value={date ? format(date, "yyyy-MM-dd'T'HH:mm") : ''}
        onChange={(e) => onDateChange(e.target.value ? new Date(e.target.value) : null)}
        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {date && (
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {format(date, 'MMM d, yyyy h:mm a')}
          </span>
          <button
            onClick={() => onDateChange(null)}
            className="text-sm text-red-500 hover:text-red-600"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};