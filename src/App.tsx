import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ChatProvider } from './contexts/ChatContext';
import Layout from './components/Layout';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <Layout />
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;