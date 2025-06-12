import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "admin";
}

const ChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageSet = useRef<Set<string>>(new Set());
  console.log(inputValue)

  // Xử lý scroll
  useEffect(() => {
    const handleScroll = () => setShowIcon(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Xử lý responsive
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 480);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Tự động cuộn xuống tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  // Reset messageSet khi đóng chat
  useEffect(() => {
    if (!isOpen) {
      messageSet.current.clear();
    }
  }, [isOpen]);

  // Xử lý gửi tin nhắn
  const handleSendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;

    // Tạo một key duy nhất cho tin nhắn
    const messageKey = `${text}-${Date.now()}`;
    
    // Kiểm tra nếu tin nhắn đã tồn tại trong 1 giây gần đây
    if (messageSet.current.has(text)) {
      return;
    }

    // Thêm tin nhắn vào set
    messageSet.current.add(text);

    // Thêm tin nhắn mới vào danh sách
    const newMessage: Message = {
      id: messageKey,
      text,
      sender: "user"
    };

    setMessageList(prev => [...prev, newMessage]);
    setInputValue("");
    inputRef.current?.focus();

    // Xóa tin nhắn khỏi set sau 1 giây
    setTimeout(() => {
      messageSet.current.delete(text);
    }, 1000);
  };

  // Xử lý phím Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Nút chat */}
      {showIcon && !isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 w-[60px] h-[60px] md:w-[60px] md:h-[60px] rounded-full bg-gradient-to-br from-red-600 to-orange-500 text-white flex items-center justify-center cursor-pointer shadow-lg z-50 text-2xl md:text-3xl border-none hover:scale-105 active:scale-95 transition-transform"
        >
          💬
        </motion.button>
      )}

      {/* Chat box */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`fixed bottom-[90px] right-6 w-[360px] h-[520px] md:bottom-[90px] md:right-6 md:w-[360px] md:h-[520px] rounded-2xl bg-white shadow-xl flex flex-col z-50 overflow-hidden border border-orange-200/30
            ${isMobile ? '!w-[calc(100vw-32px)] !h-[calc(100vh-120px)] !bottom-20 !right-4 !rounded-[20px]' : ''}`}
        >
          {/* Header */}
          <div className="px-5 py-4 md:px-5 md:py-4 bg-gradient-to-br from-red-600 to-orange-500 text-white font-bold text-lg md:text-xl flex items-center justify-between">
            <span>Chat với Admin</span>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-transparent border-none text-white text-xl cursor-pointer p-0 hover:opacity-80"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-5 bg-gray-50">
            {messageList.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2.5 rounded-2xl max-w-[85%] break-words shadow-sm
                    ${msg.sender === "user" 
                      ? "bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 border border-blue-100" 
                      : "bg-gradient-to-br from-orange-50 to-orange-100 text-red-600 border border-orange-100"}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 md:p-5 border-t border-orange-200/20 bg-white">
            <div className="flex gap-3 items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Nhập tin nhắn của bạn..."
                className="flex-1 px-4 py-2.5 rounded-2xl border border-orange-300 text-base outline-none bg-white h-10 focus:border-orange-400 transition-colors"
              />
              <button
                onClick={handleSendMessage}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 text-white font-semibold text-base cursor-pointer h-10 whitespace-nowrap hover:opacity-90 active:opacity-100 transition-opacity"
              >
                Gửi
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ChatBox; 