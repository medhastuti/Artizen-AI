import React, { useState, useRef, useEffect } from 'react';

export default function Topbar({ toggleSidebar, isMobile }) {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      msg: "Hello, I'm Artisen AI..! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const buttonRef = useRef(null);
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  const systemMessage = {
    role: "system",
    content: "Explain things like you're talking to a local artist and keep the answers brief.",
  };

  // HANDLE SENDING MESSAGE
  const handleSend = async (msg) => {
    if (!msg || !msg.trim()) return;

    const newMessage = {
      msg,
      direction: 'outgoing',
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput(''); 
    setIsTyping(true);
    await processMessageToChatGPT(updatedMessages);
  };

  // CHATGPT API CALL
  async function processMessageToChatGPT(chatMessages) {
    try {
      const apiMessages = chatMessages.map((message) => ({
        role: message.sender === "ChatGPT" ? "assistant" : "user",
        content: message.msg,
      }));

      const response = await fetch("/api/generate-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await response.json();

      // Defensive check and fallback:
      const aiContent =
        data?.choices?.[0]?.message?.content ?? "Oops, couldn't load";

      const chatGptMessage = {
        msg: aiContent,
        sender: "ChatGPT",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages([...chatMessages, chatGptMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        msg: "Oops, couldn't load!",
        sender: "ChatGPT",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([...chatMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }


  // AUTO SCROLL TO BOTTOM
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <header className="mb-8 bg-white shadow-sm rounded-xl p-4 max-w-7xl mx-auto relative">
      {isMobile && (
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={toggleSidebar}
            className="text-teal-600 hover:text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded"
            aria-label="Toggle sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-poppins">
            👋 Hello, Human
          </h1>
          <p className="text-lg text-teal-600 font-medium font-poppins">
            AI Artist Toolkit — create & promote your work
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            ref={buttonRef}
            onClick={() => setShowChat(!showChat)}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg hover:from-teal-600 hover:to-cyan-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-300"
            aria-label="Ask AI"
          >
            💬 Ask AI
          </button>

          <button
            className="px-5 py-2 rounded-full border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
            aria-label="Get Updates"
          >
            📬 Get Updates
          </button>
        </div>
      </div>

      {/* CHATBOT POPUP */}
      {showChat && (
       <div
          ref={chatRef}
          className="fixed bg-white border-2 border-slate-300 rounded-xl shadow-2xl z-50 transform transition-all duration-300 ease-in-out animate-fadeIn"
          style={{
            top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + 8 : 80,
            left: buttonRef.current
              ? Math.min(
                  buttonRef.current.getBoundingClientRect().left,
                  window.innerWidth - 320 - 16
                )
              : 20,
            width: '320px',
          }}
        >
          {/* Arrow */}
          <div
            className="absolute -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-slate-300"
            style={{
              left: buttonRef.current
                ? Math.min(
                    Math.max(
                      buttonRef.current.getBoundingClientRect().left +
                        buttonRef.current.getBoundingClientRect().width / 2 -
                        Math.min(
                          buttonRef.current.getBoundingClientRect().left,
                          window.innerWidth - 320 - 16
                        ),
                      12
                    ),
                    320 - 12
                  )
                : 160,
              transform: 'translateX(-50%)',
            }}
            
          ></div>


          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-3 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                🤖
              </div>
              <h2 className="font-semibold text-lg">AI Assistant</h2>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.length === 0 && !isTyping ? (
              <div className="text-center mt-10">
                <div className="text-4xl mb-2">💬</div>
                <p className="text-slate-500 text-sm">Start a conversation!</p>
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-end gap-2 animate-fadeIn ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'ChatGPT' && (
                      <div className="w-6 h-6 bg-teal-500 border-2 border-teal-600 rounded-full flex items-center justify-center text-xs text-white">
                        🤖
                      </div>
                    )}

                    <div
                      className={`p-3 rounded-lg max-w-[70%] shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-cyan-600 to-teal-500 text-white'
                          : 'bg-white border border-slate-200 text-slate-800'
                      }`}
                    >
                      <p className="text-sm break-words whitespace-pre-wrap">{msg.msg}</p>
                      <p
                        className={`text-[10px] mt-1 ${
                          msg.sender === 'user' ? 'text-teal-100 text-right' : 'text-slate-400'
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-xs text-white">
                        👤
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-end gap-2 justify-start animate-fadeIn">
                    <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-xs text-white">
                      🤖
                    </div>
                    <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-200 bg-white rounded-b-xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Type your message..."
                className="w-full border border-slate-300 rounded-l-lg pl-4 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              />
              <button
                onClick={() => handleSend(input)}
                className="bg-teal-500 text-white px-4 py-2 rounded-r-lg hover:bg-teal-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ transform: 'rotate(90deg)' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
