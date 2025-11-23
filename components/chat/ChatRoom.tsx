
import React, { useState, useRef, useEffect } from 'react';
import { useChatStore, Message } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../Button';
import { Input } from '../ui/Input';
import { Send, Heart, Trash2, Reply, X } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export const ChatRoom: React.FC = () => {
  const { currentRoomId, rooms, messages, sendMessage, likeMessage, deleteMessage } = useChatStore();
  const { user } = useAuthStore();
  const [inputValue, setInputValue] = useState('');
  const [replyingTo, setReplyingTo] = useState<Message | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentRoom = rooms.find(r => r.id === currentRoomId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !user) return;

    sendMessage(inputValue.trim(), user.id, user.name, replyingTo);
    setInputValue('');
    setReplyingTo(undefined);
  };

  if (!currentRoom) return null;

  return (
    <div className="flex flex-col h-full bg-white md:bg-transparent">
      {/* Room Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm md:hidden">
        <h2 className="font-semibold text-slate-900">{currentRoom.name}</h2>
        <span className="text-xs text-slate-500">{currentRoom.participants} active</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <p>No messages yet. Be the first to say hi!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === user?.id;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx("flex gap-3 max-w-3xl", isMe ? "ml-auto flex-row-reverse" : "")}
              >
                {/* Avatar */}
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold uppercase shadow-sm">
                  {msg.senderName.substring(0, 2)}
                </div>

                <div className={clsx("flex flex-col", isMe ? "items-end" : "items-start")}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-semibold text-slate-900">{msg.senderName}</span>
                    <span className="text-xs text-slate-400">{format(new Date(msg.createdAt), 'HH:mm')}</span>
                  </div>

                  <div className={clsx(
                    "relative group rounded-2xl px-4 py-2 shadow-sm text-sm",
                    isMe 
                      ? "bg-brand-600 text-white rounded-tr-none" 
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                  )}>
                    {/* Reply Context */}
                    {msg.replyTo && (
                      <div className={clsx(
                        "mb-2 p-2 rounded text-xs border-l-2 opacity-90",
                        isMe ? "bg-brand-700 border-brand-300" : "bg-slate-100 border-slate-300"
                      )}>
                        <span className="font-semibold block mb-0.5">{msg.replyTo.senderName}</span>
                        <span className="line-clamp-1">{msg.replyTo.content}</span>
                      </div>
                    )}
                    
                    {msg.content}

                    {/* Likes Counter */}
                    {msg.likes > 0 && (
                      <div className={clsx(
                        "absolute -bottom-3 right-2 bg-white rounded-full px-1.5 py-0.5 text-xs shadow-sm border border-slate-100 flex items-center gap-0.5 text-slate-600",
                        isMe && "right-auto -left-2"
                      )}>
                        <Heart size={10} className="fill-red-500 text-red-500" />
                        {msg.likes}
                      </div>
                    )}

                    {/* Actions Hover Menu */}
                    <div className={clsx(
                      "absolute top-0 bottom-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
                      isMe ? "-left-20 pr-2" : "-right-20 pl-2"
                    )}>
                      <button 
                        onClick={() => setReplyingTo(msg)}
                        className="p-1.5 rounded-full bg-white shadow-sm border border-slate-100 text-slate-500 hover:text-brand-600"
                        title="Reply"
                      >
                        <Reply size={14} />
                      </button>
                      <button 
                        onClick={() => likeMessage(msg.id)}
                        className="p-1.5 rounded-full bg-white shadow-sm border border-slate-100 text-slate-500 hover:text-red-500"
                        title="Like"
                      >
                        <Heart size={14} />
                      </button>
                      {isMe && (
                        <button 
                          onClick={() => deleteMessage(msg.id)}
                          className="p-1.5 rounded-full bg-white shadow-sm border border-slate-100 text-slate-500 hover:text-slate-900"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence>
            {replyingTo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between bg-slate-50 p-2 rounded-lg mb-2 border-l-4 border-brand-500 text-sm"
              >
                <div className="text-slate-600">
                  Replying to <span className="font-semibold">{replyingTo.senderName}</span>: "{replyingTo.content.substring(0, 30)}..."
                </div>
                <button onClick={() => setReplyingTo(undefined)} className="text-slate-400 hover:text-slate-600">
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Message #${currentRoom.name}`}
              className="flex-1 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
            <Button 
              type="submit" 
              disabled={!inputValue.trim()} 
              className="rounded-full px-4"
            >
              <Send size={18} className={inputValue.trim() ? "ml-1" : ""} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
