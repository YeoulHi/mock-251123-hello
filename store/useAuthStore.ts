
import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, name: string) => Promise<void>;
  signup: (email: string, name: string) => Promise<void>;
  logout: () => void;
}

// Mock delay to simulate API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async (email, name) => {
    set({ isLoading: true });
    await delay(800);
    set({
      user: { id: 'user-1', email, name: name || 'User' },
      isAuthenticated: true,
      isLoading: false,
    });
  },
  signup: async (email, name) => {
    set({ isLoading: true });
    await delay(1000);
    set({
      user: { id: 'user-1', email, name },
      isAuthenticated: true,
      isLoading: false,
    });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
