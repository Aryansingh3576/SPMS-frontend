import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm your Smart Plant AI. Ask me anything about your plants!", sender: "bot" },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        // Mock AI Response
        setTimeout(() => {
            let botText = "I'm not sure about that, but I'm learning!";
            const lowerInput = input.toLowerCase();

            if (lowerInput.includes("water")) {
                botText = "Most indoor plants need watering when the top inch of soil is dry. Check your specific plant's needs in the AI Assistant tab!";
            } else if (lowerInput.includes("yellow") || lowerInput.includes("leaf")) {
                botText = "Yellow leaves often indicate overwatering or nutrient deficiency. Try checking the NPK levels in the Analytics tab.";
            } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
                botText = "Hello! How can I help you with your garden today?";
            } else if (lowerInput.includes("temperature")) {
                botText = "Most tropical plants prefer temperatures between 18°C and 24°C.";
            }

            setMessages((prev) => [...prev, { id: Date.now() + 1, text: botText, sender: "bot" }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-80 sm:w-96 mb-4 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-[500px] transition-all duration-300 animate-in slide-in-from-bottom-10 fade-in">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 flex items-center justify-between text-white">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm flex items-center">
                                    Plant AI Assistant
                                    <Sparkles className="w-3 h-3 ml-1 text-yellow-300" />
                                </h3>
                                <p className="text-xs text-green-100 flex items-center mt-0.5">
                                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full mr-1.5 animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === "user"
                                        ? "bg-green-600 text-white rounded-br-none"
                                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-none"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about your plants..."
                                className="flex-1 bg-gray-100 dark:bg-gray-900 border-0 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:bg-white dark:focus:bg-gray-900 transition-all outline-none placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg active:scale-95 transform duration-200"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rotate-90"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-green-500/30"
                    }`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>
        </div>
    );
}
