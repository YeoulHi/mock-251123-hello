
import React from 'react';
import { Zap, LogOut, ArrowLeft } from 'lucide-react';
import { Button } from './Button';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { currentRoomId, leaveRoom } = useChatStore();

  return (
    <header className="bg-white border-b border-slate-200 h-16 md:h-20 flex-shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isAuthenticated && currentRoomId && (
            <button 
              onClick={leaveRoom}
              className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => isAuthenticated && currentRoomId && leaveRoom()}
          >
            <div className="bg-brand-600 p-1.5 rounded-lg text-white">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight hidden sm:block">
              StreamChat
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <span className="text-sm font-medium text-slate-600 hidden sm:block">
                {user.name}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="text-slate-500 hover:text-red-600"
              >
                <LogOut size={18} className="mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <span className="text-sm text-slate-500">Welcome, Guest</span>
          )}
        </div>
      </div>
    </header>
  );
};
