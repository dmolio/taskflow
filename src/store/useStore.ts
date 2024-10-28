import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskList } from '../types/task';

interface TaskStore {
  tasks: Task[];
  lists: TaskList[];
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addList: (list: TaskList) => void;
  deleteList: (id: string) => void;
}

export const useStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      lists: [{ id: 'default', name: 'My Tasks', color: '#3b82f6' }],
      addTask: (task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      addList: (list) =>
        set((state) => ({ lists: [...state.lists, list] })),
      deleteList: (id) =>
        set((state) => ({
          lists: state.lists.filter((list) => list.id !== id),
          tasks: state.tasks.filter((task) => task.list !== id),
        })),
    }),
    {
      name: 'taskflow-storage',
    }
  )
);