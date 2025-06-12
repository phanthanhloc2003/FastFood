// src/hooks/useChat.ts
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: number;
  senderId: number;
  recipientId?: number;
  content: string;
  isRead: boolean;
  createdAt: Date;
  sender: {
    id: number;
    username: string;
  };
}

export const useChat = (userId: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<{ [key: string]: boolean }>({});
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3000', {
      query: { userId: userId.toString() }
    });
    socketRef.current.on('connect', () => {
      console.log('Connected to chat server');
    });
    socketRef.current.on('receive_message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });
    socketRef.current.on('messages_list', (messageList: Message[]) => {
      setMessages(messageList);
    });

    socketRef.current.on('typing_started', ({ userId, isAdmin }) => {
      setIsTyping(prev => ({
        ...prev,
        [isAdmin ? 'admin' : userId]: true
      }));
    });
    socketRef.current.on('typing_stopped', ({ userId, isAdmin }) => {
      setIsTyping(prev => ({
        ...prev,
        [isAdmin ? 'admin' : userId]: false
      }));
    });
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId]);
  const sendMessage = (content: string, recipientId?: number) => {
    if (socketRef.current) {
      socketRef.current.emit('send_message', {
        senderId: userId,
        content,
        recipientId
      });
    }
  };
  const startTyping = (recipientId?: number) => {
    if (socketRef.current) {
      socketRef.current.emit('typing_start', {
        senderId: userId,
        recipientId
      });
    }
  };
  const stopTyping = (recipientId?: number) => {
    if (socketRef.current) {
      socketRef.current.emit('typing_stop', {
        senderId: userId,
        recipientId
      });
    }
  };
  const getMessages = () => {
    if (socketRef.current) {
      socketRef.current.emit('get_messages', userId);
    }
  };

  return {
    messages,
    isTyping,
    sendMessage,
    startTyping,
    stopTyping,
    getMessages
  };
};