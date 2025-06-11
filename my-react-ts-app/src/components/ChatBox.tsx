import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  {
    question: "Thời gian giao hàng là bao lâu?",
    answer: "Thời gian giao hàng trung bình từ 20-30 phút tuỳ khu vực."
  },
  {
    question: "Có chương trình khuyến mãi không?",
    answer: "Hiện tại chúng tôi đang có nhiều ưu đãi hấp dẫn, bạn hãy theo dõi trang chủ để cập nhật nhé!"
  }
];

const ChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "admin" | "loading" }[]>([]);
  const [isWaitingReply, setIsWaitingReply] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowIcon(true);
      } else {
        setShowIcon(false);
        setIsOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSendMessage = (msg?: string) => {
    if (isWaitingReply) return;
    const text = typeof msg === "string" ? msg : newMessage;
    if (text.trim() === "") return;
    setMessages((prev) => [
      ...prev,
      { text, sender: "user" },
      { text: "Đang trả lời...", sender: "loading" }
    ]);
    setIsWaitingReply(true);
    setTimeout(() => {
      setMessages((prev) => {
        const idx = prev.findIndex((m) => m.sender === "loading");
        if (idx === -1) return prev;
        const found = QUESTIONS.find(q => q.question === text);
        const reply = found ? found.answer : "Admin đã nhận tin nhắn của bạn.";
        const newArr = [...prev];
        newArr[idx] = { text: reply, sender: "admin" };
        return newArr;
      });
      setIsWaitingReply(false);
    }, 900);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleQuestionClick = (q: string) => {
    handleSendMessage(q);
  };

  return (
    <>
      <AnimatePresence>
        {showIcon && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setIsOpen(true)}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              width: isMobile ? "50px" : "60px",
              height: isMobile ? "50px" : "60px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #e53e3e 0%, #ff9800 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 24px rgba(229,62,62,0.25)",
              zIndex: 1000,
              fontSize: isMobile ? "24px" : "28px",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span role="img" aria-label="chat">💬</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{
              position: "fixed",
              bottom: isMobile ? "80px" : "90px",
              right: isMobile ? "16px" : "24px",
              width: isMobile ? "calc(100vw - 32px)" : "360px",
              height: isMobile ? "calc(100vh - 120px)" : "520px",
              borderRadius: isMobile ? "20px" : "24px",
              background: "#fff",
              boxShadow: "0 12px 40px rgba(229,62,62,0.15)",
              display: "flex",
              flexDirection: "column",
              zIndex: 1000,
              overflow: "hidden",
              border: "1px solid rgba(255,177,153,0.3)"
            }}
          >
            <div
              style={{
                padding: isMobile ? "12px 16px" : "16px 20px",
                borderTopLeftRadius: "18px",
                borderTopRightRadius: "18px",
                background: "linear-gradient(135deg, #e53e3e 0%, #ff9800 100%)",
                color: "#fff",
                fontWeight: 700,
                fontSize: isMobile ? "16px" : "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 2px 12px rgba(229,62,62,0.15)"
              }}
            >
              <span>Chat với Admin</span>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                  fontWeight: 700
                }}
                aria-label="Đóng chat"
              >×</button>
            </div>
            <div style={{ padding: "clamp(12px, 2vw, 16px) clamp(16px, 2.5vw, 20px)" }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuestionClick(q.question)}
                    style={{
                      background: "#fff7f0",
                      color: "#e53e3e",
                      border: "1px solid #ffe0b2",
                      borderRadius: "16px",
                      padding: "6px 14px",
                      fontSize: 14,
                      cursor: "pointer",
                      marginBottom: 6,
                      transition: "background 0.15s"
                    }}
                    onMouseOver={e => (e.currentTarget.style.background = "#ffe0b2")}
                    onMouseOut={e => (e.currentTarget.style.background = "#fff7f0")}
                  >
                    {q.question}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ 
              flex: 1, 
              overflowY: "auto", 
              padding: isMobile ? "12px 16px" : "16px 20px",
              background: "#fafafa"
            }}>
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30, delay: i * 0.05 }}
                    style={{ 
                      marginBottom: "12px", 
                      textAlign: msg.sender === "user" ? "right" : "left",
                      display: "flex",
                      justifyContent: msg.sender === "user" ? "flex-end" : "flex-start"
                    }}
                  >
                    <motion.span
                      whileHover={{ scale: 1.02 }}
                      style={{
                        display: "inline-block",
                        padding: "10px 16px",
                        borderRadius: "20px",
                        background: msg.sender === "user" 
                          ? "linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%)" 
                          : msg.sender === "admin" 
                            ? "linear-gradient(135deg, #fff7f0 0%, #ffe0b2 100%)"
                            : "#f5f5f5",
                        color: msg.sender === "user" ? "#333" : msg.sender === "admin" ? "#e53e3e" : "#aaa",
                        fontSize: 15,
                        maxWidth: "85%",
                        wordBreak: "break-word",
                        fontStyle: msg.sender === "loading" ? "italic" : undefined,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        border: msg.sender === "user" 
                          ? "1px solid rgba(24,144,255,0.1)"
                          : msg.sender === "admin"
                            ? "1px solid rgba(229,62,62,0.1)"
                            : "none"
                      }}
                    >{msg.text}</motion.span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ 
                padding: isMobile ? "12px 16px" : "16px 20px", 
                borderTop: "1px solid rgba(255,177,153,0.2)", 
                background: "#fff",
                boxShadow: "0 -2px 12px rgba(0,0,0,0.03)"
              }}
            >
              <div style={{ 
                display: "flex", 
                gap: "12px",
                alignItems: "center"
              }}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập tin nhắn của bạn..."
                  style={{
                    flex: 1,
                    padding: isMobile ? "8px 12px" : "10px 16px",
                    borderRadius: "20px",
                    border: "1px solid #ffb199",
                    fontSize: isMobile ? "14px" : "15px",
                    outline: "none",
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(229,62,62,0.05)",
                    transition: "border-color 0.2s ease",
                    height: "40px",
                    minHeight: "40px",
                    maxHeight: "40px"
                  }}
                  disabled={isWaitingReply}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  style={{
                    padding: isMobile ? "8px 16px" : "10px 20px",
                    borderRadius: "20px",
                    background: isWaitingReply 
                      ? "#ffb199" 
                      : "linear-gradient(135deg, #e53e3e 0%, #ff9800 100%)",
                    color: "#fff",
                    border: "none",
                    fontWeight: 600,
                    fontSize: isMobile ? "14px" : "15px",
                    cursor: isWaitingReply ? "not-allowed" : "pointer",
                    boxShadow: isWaitingReply 
                      ? "none" 
                      : "0 4px 12px rgba(229,62,62,0.2)",
                    transition: "all 0.2s ease",
                    height: "40px",
                    minHeight: "40px",
                    whiteSpace: "nowrap"
                  }}
                  disabled={isWaitingReply}
                >{isWaitingReply ? "Đang trả lời..." : "Gửi"}</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Thêm CSS cho responsive
const styles = `
  @media (max-width: 480px) {
    .chat-box {
      width: calc(100vw - 32px) !important;
      right: 16px !important;
      bottom: 80px !important;
      height: calc(100vh - 120px) !important;
      border-radius: 20px !important;
    }
    
    .chat-input {
      font-size: 14px !important;
      padding: 8px 12px !important;
    }
    
    .chat-button {
      font-size: 14px !important;
      padding: 8px 16px !important;
    }
  }
`;

// Thêm style tag vào document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default ChatBox; 