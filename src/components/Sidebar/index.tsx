import React from 'react';
import { MessageSquare, X } from 'lucide-react';
import ChatList from './ChatList';
import ThemeToggle from '../ThemeToggle';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 left-0 z-50 h-full w-72 bg-white dark:bg-gray-900 
          border-r border-gray-200 dark:border-gray-800 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 text-orange-500 dark:text-orange-400" />
            <h1 className="ml-2 font-bold text-lg text-gray-900 dark:text-white">GenIALogue</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <button
              onClick={onClose}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Chat list */}
        <div className="flex-grow overflow-hidden">
          <ChatList />
        </div>
        
        {/* Footer */}
        <div className="p-3 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
          © 2025 GenIALogue
        </div>
      </aside>
    </>
  );
};

export default Sidebar;