"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send } from "lucide-react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isTyping]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setChat((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");
    setIsTyping(true);

    try {
      const response = await axios.post("/api/chatbot", { message });
      const botReply = response.data.reply;

      setChat((prev) => [...prev, { role: "bot", content: "" }]);

      let currentText = "";
      for (const char of botReply) {
        currentText += char;
        await new Promise((resolve) => setTimeout(resolve, 50));
        setChat((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage.role === "bot") {
            return [
              ...prev.slice(0, -1),
              { ...lastMessage, content: currentText },
            ];
          }
          return prev;
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { 
          role: "bot", 
          content: "⚠️ Error processing request. Please try again." 
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div 
      className="min-h-screen p-4 flex items-center justify-center bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/img3.png')" }}
    >
      <div className="w-full max-w-2xl bg-black/60 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Hello I am Spiriter
            </h1>
            <p className="text-gray-300 mt-2 text-sm">
              How can I help you Today ?
            </p>
          </div>

          {/* Chat Messages with Custom Scrollbar */}
          <div className="h-[500px] overflow-y-auto mb-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-900/20">
            <div className="space-y-4 pr-2">
              {chat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 ${
                      msg.role === "user"
                        ? "bg-indigo-600/90 text-white shadow-lg"
                        : "bg-gray-800/90 text-gray-100 shadow-lg"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] bg-gray-800/90 text-gray-300 rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="flex gap-3">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 p-3 bg-gray-800/70 backdrop-blur-lg text-white rounded-xl outline-none resize-none overflow-hidden border border-indigo-400/30 focus:border-indigo-400/50 transition-all placeholder-gray-400"
              placeholder="Message Spiriter ..."
              rows={1}
              style={{ minHeight: "56px" }}
            />
            <button
              onClick={sendMessage}
              className="h-14 w-14 p-2 bg-indigo-600/90 hover:bg-indigo-700/90 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50"
              disabled={!message.trim() || isTyping}
            >
              <Send size={24} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}