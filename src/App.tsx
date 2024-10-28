import React, { useState } from 'react';
import { Layout, ListChecks, Calendar, Tag, Settings, Menu, X } from 'lucide-react';
import { TaskItem } from './components/TaskItem';
import { AddTask } from './components/AddTask';
import { SettingsModal } from './components/SettingsModal';
import { CalendarView } from './components/CalendarView';
import { TagsView } from './components/TagsView';
import { useStore } from './store/useStore';

type View = 'tasks' | 'calendar' | 'tags';

function App() {
  const { tasks, lists } = useStore();
  const [activeList, setActiveList] = useState('default');
  const [showSettings, setShowSettings] = useState(false);
  const [currentView, setCurrentView] = useState<View>('tasks');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const toggleMobileSidebar = () => setShowMobileSidebar(!showMobileSidebar);

  const renderContent = () => {
    switch (currentView) {
      case 'calendar':
        return <CalendarView tasks={tasks} />;
      case 'tags':
        return <TagsView tasks={tasks} />;
      default:
        return (
          <div className="space-y-4">
            <AddTask listId={activeList} />
            {tasks
              .filter(task => task.list === activeList)
              .map(task => (
                <TaskItem key={task.id} task={task} />
              ))
            }
          </div>
        );
    }
  };

  const sidebarContent = (
    <>
      <div className="flex items-center gap-2 mb-8">
        <Layout className="w-6 h-6 text-blue-500" />
        <h1 className="text-xl font-bold text-gray-800">TaskFlow</h1>
      </div>

      <nav>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => {
                setCurrentView('tasks');
                setShowMobileSidebar(false);
              }}
              className={`flex items-center gap-2 w-full p-2 rounded-lg ${
                currentView === 'tasks' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ListChecks className="w-5 h-5" />
              <span>Tasks</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setCurrentView('calendar');
                setShowMobileSidebar(false);
              }}
              className={`flex items-center gap-2 w-full p-2 rounded-lg ${
                currentView === 'calendar' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Calendar</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setCurrentView('tags');
                setShowMobileSidebar(false);
              }}
              className={`flex items-center gap-2 w-full p-2 rounded-lg ${
                currentView === 'tags' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Tag className="w-5 h-5" />
              <span>Tags</span>
            </button>
          </li>
        </ul>

        <div className="mt-8">
          <h2 className="text-sm font-semibold text-gray-400 mb-2">LISTS</h2>
          <ul className="space-y-1">
            {lists.map(list => (
              <li key={list.id}>
                <button
                  onClick={() => {
                    setActiveList(list.id);
                    setCurrentView('tasks');
                    setShowMobileSidebar(false);
                  }}
                  className={`flex items-center gap-2 w-full p-2 rounded-lg ${
                    activeList === list.id && currentView === 'tasks'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: list.color }} />
                  <span>{list.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="absolute bottom-4 left-4">
        <button
          onClick={() => {
            setShowSettings(true);
            setShowMobileSidebar(false);
          }}
          className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {showMobileSidebar ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 p-4 relative">
        {sidebarContent}
      </aside>

      {/* Sidebar - Mobile */}
      {showMobileSidebar && (
        <aside className="lg:hidden fixed inset-0 bg-white z-40 p-4 overflow-y-auto">
          {sidebarContent}
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 mt-14 lg:mt-0">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              {currentView === 'calendar' ? 'Calendar' :
               currentView === 'tags' ? 'Tags' :
               'My Tasks'}
            </h1>
          </header>

          {renderContent()}
        </div>
      </main>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}

export default App;