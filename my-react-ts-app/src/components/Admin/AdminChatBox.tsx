import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatBubbleLeftIcon, 
  XMarkIcon, 
  PaperAirplaneIcon, 
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: Date;
  status: 'sending' | 'sent' | 'error';
}

interface ChatSession {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
  isOnline?: boolean;
}

const AdminChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showChatList, setShowChatList] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [showOptions, setShowOptions] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Nguyễn Văn A',
      userAvatar: '/default-avatar.png',
      lastMessage: 'Xin chào, tôi cần hỗ trợ',
      lastMessageTime: new Date(),
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: '1',
          text: 'Xin chào, tôi cần hỗ trợ',
          sender: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          status: 'sent'
        },
        {
          id: '2',
          text: 'Chào bạn, tôi có thể giúp gì cho bạn?',
          sender: 'admin',
          timestamp: new Date(Date.now() - 1000 * 60 * 4),
          status: 'sent'
        },
        {
          id: '3',
          text: 'Tôi muốn hỏi về thời gian giao hàng',
          sender: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 3),
          status: 'sent'
        }
      ]
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Trần Thị B',
      userAvatar: '/default-avatar.png',
      lastMessage: 'Cảm ơn admin đã hỗ trợ',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: '1',
          text: 'Cảm ơn admin đã hỗ trợ',
          sender: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          status: 'sent'
        }
      ]
    }
  ]);

  // Xử lý responsive
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setShowChatList(!activeChat);
      } else {
        setShowChatList(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [activeChat]);

  // Tự động chọn chat mới nhất
  useEffect(() => {
    if (isOpen && !activeChat && chatSessions.length > 0) {
      const latestChat = chatSessions.reduce((prev, current) => 
        current.lastMessageTime > prev.lastMessageTime ? current : prev
      );
      setActiveChat(latestChat.id);
    }
  }, [isOpen, activeChat, chatSessions]);

  // Tự động cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    if (activeChat && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat, chatSessions]);

  // Focus vào input khi mở chat
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, activeChat]);

  // Xử lý gửi tin nhắn
  const handleSendMessage = useCallback(async () => {
    if (!newMessage.trim() || !activeChat || isSending) return;

    const messageId = Date.now().toString();
    const tempMessage: Message = {
      id: messageId,
      text: newMessage,
      sender: 'admin',
      timestamp: new Date(),
      status: 'sending'
    };

    try {
      setIsSending(true);
      setNewMessage('');

      // Cập nhật UI ngay lập tức với tin nhắn đang gửi
      setChatSessions(prev => prev.map(session => {
        if (session.id === activeChat) {
          return {
            ...session,
            lastMessage: newMessage,
            lastMessageTime: new Date(),
            messages: [...session.messages, tempMessage],
            unreadCount: 0
          };
        }
        return session;
      }));

      // Giả lập delay gửi tin nhắn
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Cập nhật trạng thái tin nhắn thành công
      setChatSessions(prev => prev.map(session => {
        if (session.id === activeChat) {
          return {
            ...session,
            messages: session.messages.map(msg => 
              msg.id === messageId ? { ...msg, status: 'sent' } : msg
            )
          };
        }
        return session;
      }));

    } catch (error) {
      // Xử lý lỗi gửi tin nhắn
      setChatSessions(prev => prev.map(session => {
        if (session.id === activeChat) {
          return {
            ...session,
            messages: session.messages.map(msg => 
              msg.id === messageId ? { ...msg, status: 'error' } : msg
            )
          };
        }
        return session;
      }));
    } finally {
      setIsSending(false);
    }
  }, [newMessage, activeChat, isSending]);

  // Xử lý phím Enter
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isSending) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage, isSending]);

  // Lọc danh sách chat
  const filteredSessions = chatSessions.filter(session =>
    session.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format thời gian
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Format ngày
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hôm nay';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Hôm qua';
    } else {
      return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
    }
  };

  // Kiểm tra xem có phải tin nhắn mới ngày không
  const isNewDay = (current: Date, previous?: Date) => {
    if (!previous) return true;
    return current.toDateString() !== previous.toDateString();
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(true);
          if (isMobile) {
            setShowChatList(true);
            setActiveChat(null);
          }
        }}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
      >
        <ChatBubbleLeftIcon className="w-6 h-6" />
        {chatSessions.some(session => session.unreadCount > 0) && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {chatSessions.reduce((sum, session) => sum + session.unreadCount, 0)}
          </span>
        )}
      </motion.button>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed bottom-24 right-6 bg-white rounded-2xl shadow-2xl flex overflow-hidden z-40
              ${isMobile ? 'w-[calc(100vw-3rem)] h-[calc(100vh-8rem)]' : 'w-[800px] h-[600px]'}`}
          >
            {/* Chat List */}
            <AnimatePresence>
              {showChatList && (
                <motion.div
                  initial={isMobile ? { x: '-100%' } : { x: 0 }}
                  animate={{ x: 0 }}
                  exit={isMobile ? { x: '-100%' } : { x: 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  className={`${isMobile ? 'absolute inset-0' : 'w-1/3'} border-r border-gray-200 bg-gray-50 flex flex-col`}
                >
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-semibold text-gray-800">Tin nhắn</h2>
                      {isMobile && (
                        <button
                          onClick={() => setIsOpen(false)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <XMarkIcon className="w-5 h-5 text-gray-500" />
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tìm kiếm..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors text-sm"
                      />
                      <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {filteredSessions.map(session => (
                      <motion.button
                        key={session.id}
                        whileHover={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}
                        onClick={() => {
                          setActiveChat(session.id);
                          if (isMobile) {
                            setShowChatList(false);
                          }
                        }}
                        className={`w-full p-4 flex items-center gap-3 border-b border-gray-100 transition-colors ${
                          activeChat === session.id ? 'bg-orange-50' : ''
                        }`}
                      >
                        <div className="relative flex-shrink-0">
                          <img
                            src={session.userAvatar}
                            alt={session.userName}
                            className="w-12 h-12 rounded-full ring-2 ring-orange-500"
                          />
                          {session.isOnline && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
                          )}
                          {session.unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {session.unreadCount}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-900 truncate">
                              {session.userName}
                            </h3>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                              {formatTime(session.lastMessageTime)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {session.lastMessage}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Window */}
            <div className={`${isMobile ? 'w-full' : 'flex-1'} flex flex-col`}>
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isMobile && (
                        <button
                          onClick={() => setShowChatList(true)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <XMarkIcon className="w-5 h-5 text-gray-500" />
                        </button>
                      )}
                      <img
                        src={chatSessions.find(s => s.id === activeChat)?.userAvatar}
                        alt="User"
                        className="w-10 h-10 rounded-full ring-2 ring-orange-500"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {chatSessions.find(s => s.id === activeChat)?.userName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {chatSessions.find(s => s.id === activeChat)?.isOnline ? 'Đang hoạt động' : 'Ngoại tuyến'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowOptions(showOptions === activeChat ? null : activeChat)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                      >
                        <EllipsisHorizontalIcon className="w-6 h-6 text-gray-500" />
                        {showOptions === activeChat && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50"
                          >
                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-orange-50">
                              Xóa cuộc hội thoại
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-orange-50">
                              Chặn người dùng
                            </button>
                          </motion.div>
                        )}
                      </button>
                      {!isMobile && (
                        <button
                          onClick={() => setIsOpen(false)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <XMarkIcon className="w-6 h-6 text-gray-500" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    <AnimatePresence initial={false}>
                      {chatSessions
                        .find(s => s.id === activeChat)
                        ?.messages.map((message, index, messages) => (
                          <React.Fragment key={message.id}>
                            {isNewDay(message.timestamp, messages[index - 1]?.timestamp) && (
                              <div className="flex justify-center my-4">
                                <span className="px-4 py-1 bg-gray-100 text-gray-500 text-sm rounded-full">
                                  {formatDate(message.timestamp)}
                                </span>
                              </div>
                            )}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                              className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'} mb-4`}
                            >
                              <div
                                className={`max-w-[70%] rounded-2xl px-4 py-2 relative group ${
                                  message.sender === 'admin'
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white text-gray-800 shadow-sm'
                                }`}
                              >
                                <p className="text-sm">{message.text}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <span className="text-xs opacity-70">
                                    {formatTime(message.timestamp)}
                                  </span>
                                  {message.sender === 'admin' && (
                                    <span className="text-xs">
                                      {message.status === 'sending' && 'Đang gửi...'}
                                      {message.status === 'sent' && '✓'}
                                      {message.status === 'error' && '✕'}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          </React.Fragment>
                        ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Nhập tin nhắn..."
                        disabled={isSending}
                        className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                      <motion.button
                        whileHover={{ scale: isSending ? 1 : 1.05 }}
                        whileTap={{ scale: isSending ? 1 : 0.95 }}
                        onClick={handleSendMessage}
                        disabled={isSending || !newMessage.trim()}
                        className={`p-2 rounded-xl transition-colors ${
                          isSending || !newMessage.trim()
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-orange-500 hover:bg-orange-600 text-white'
                        }`}
                      >
                        {isSending ? (
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <PaperAirplaneIcon className="w-6 h-6" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Chọn một cuộc hội thoại để bắt đầu
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminChatBox; 