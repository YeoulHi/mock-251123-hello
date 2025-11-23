
import { create } from 'zustand';
import { format } from 'date-fns';

export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
  likes: number;
  replyTo?: {
    id: string;
    content: string;
    senderName: string;
  };
}

export interface ChatRoom {
  id: string;
  name: string;
  lastMessage?: string;
  participants: number;
}

interface ChatStore {
  rooms: ChatRoom[];
  currentRoomId: string | null;
  messages: Message[];
  
  // Actions
  createRoom: (name: string) => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: () => void;
  sendMessage: (content: string, senderId: string, senderName: string, replyTo?: Message) => void;
  deleteMessage: (messageId: string) => void;
  likeMessage: (messageId: string) => void;
}

const INITIAL_ROOMS: ChatRoom[] = [
  { id: '1', name: 'General', participants: 12, lastMessage: 'Welcome to the team!' },
  { id: '2', name: 'Engineering', participants: 5, lastMessage: 'Deploying to prod...' },
  { id: '3', name: 'Random', participants: 8, lastMessage: 'Anyone for lunch?' },
];

export const useChatStore = create<ChatStore>((set, get) => ({
  rooms: INITIAL_ROOMS,
  currentRoomId: null,
  messages: [],

  createRoom: (name) => {
    const newRoom: ChatRoom = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      participants: 1,
      lastMessage: 'Room created',
    };
    set((state) => ({ rooms: [newRoom, ...state.rooms] }));
  },

  joinRoom: (roomId) => {
    // Simulate fetching messages for the room
    const dummyMessages: Message[] = [
      {
        id: 'msg-1',
        roomId,
        senderId: 'system',
        senderName: 'System',
        content: 'Welcome to the channel!',
        createdAt: new Date().toISOString(),
        likes: 0,
      }
    ];
    set({ currentRoomId: roomId, messages: dummyMessages });
  },

  leaveRoom: () => set({ currentRoomId: null, messages: [] }),

  sendMessage: (content, senderId, senderName, replyTo) => {
    const { currentRoomId } = get();
    if (!currentRoomId) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      roomId: currentRoomId,
      senderId,
      senderName,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      replyTo: replyTo ? {
        id: replyTo.id,
        content: replyTo.content,
        senderName: replyTo.senderName
      } : undefined
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
      rooms: state.rooms.map(r => 
        r.id === currentRoomId 
          ? { ...r, lastMessage: content } 
          : r
      )
    }));
  },

  deleteMessage: (messageId) => {
    set((state) => ({
      messages: state.messages.filter((m) => m.id !== messageId),
    }));
  },

  likeMessage: (messageId) => {
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === messageId ? { ...m, likes: m.likes + 1 } : m
      ),
    }));
  },
}));
