import React from 'react';
import { format } from 'date-fns';

interface DatePickerProps {
  date: Date;
  onChange: (date: Date) => void;
}

export function DatePicker({ date, onChange }: DatePickerProps) {
  return (
    <input
      type="date"
      value={format(date, 'yyyy-MM-dd')}
      onChange={(e) => onChange(new Date(e.target.value))}
      className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}