import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-800 transition-transform hover:rotate-12" />
      ) : (
        <Sun className="w-5 h-5 text-cream transition-transform hover:rotate-12" />
      )}
    </button>
  );
};

export default ThemeToggle;