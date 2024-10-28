import React from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { lists, addList, deleteList } = useStore();
  const [newListName, setNewListName] = React.useState('');
  const [newListColor, setNewListColor] = React.useState('#3b82f6');

  const handleAddList = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListName.trim()) {
      addList({
        id: Date.now().toString(),
        name: newListName.trim(),
        color: newListColor
      });
      setNewListName('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Manage Lists</h3>
          <form onSubmit={handleAddList} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="New list name"
                className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="color"
                value={newListColor}
                onChange={(e) => setNewListColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </form>

          <div className="space-y-2">
            {lists.map(list => (
              <div key={list.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: list.color }} />
                  <span className="text-gray-700">{list.name}</span>
                </div>
                {list.id !== 'default' && (
                  <button
                    onClick={() => deleteList(list.id)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};