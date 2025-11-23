
import React, { useState } from 'react';
import { useAuthStore } from './store/useAuthStore';
import { useChatStore } from './store/useChatStore';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { ChatRoomList } from './components/chat/ChatRoomList';
import { ChatRoom } from './components/chat/ChatRoom';

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { currentRoomId } = useChatStore();
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  // Routing Logic (Client-side simulation of IA)
  let content;

  if (!isAuthenticated) {
    if (authView === 'login') {
      content = <LoginPage onNavigateToSignup={() => setAuthView('signup')} />;
    } else {
      content = <SignupPage onNavigateToLogin={() => setAuthView('login')} />;
    }
  } else {
    if (currentRoomId) {
      content = <ChatRoom />;
    } else {
      content = <ChatRoomList />;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-100 selection:text-brand-900">
      <Navbar />
      <main className="flex-1 h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col">
        {content}
      </main>
    </div>
  );
};

export default App;
