
import React, { useState } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { Button } from '../Button';
import { Plus, Users, MessageSquare, ChevronRight } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { Input } from '../ui/Input';
import { motion } from 'framer-motion';

export const ChatRoomList: React.FC = () => {
  const { rooms, joinRoom, createRoom } = useChatStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoomName.trim()) {
      createRoom(newRoomName.trim());
      setNewRoomName('');
      setIsCreateOpen(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-4 sm:p-6 lg:p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Chat Rooms</h1>
          <p className="text-slate-500">Join a conversation or start a new one</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus size={20} className="mr-2" />
          New Room
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 overflow-y-auto pb-4">
        {rooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => joinRoom(room.id)}
            className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-300 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-lg">{room.name}</h3>
                <p className="text-slate-500 text-sm truncate max-w-[200px] sm:max-w-md">
                  {room.lastMessage || "No messages yet"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-slate-400 text-sm">
                <Users size={16} />
                <span>{room.participants}</span>
              </div>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-brand-500" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Room Modal */}
      <Dialog.Root open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-6 shadow-xl animate-in zoom-in-95">
            <Dialog.Title className="text-lg font-semibold text-slate-900 mb-4">Create New Chat Room</Dialog.Title>
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <Input
                placeholder="e.g. Project Alpha Discussion"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                autoFocus
                label="Room Name"
              />
              <div className="flex gap-3 justify-end pt-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!newRoomName.trim()}>
                  Create Room
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
