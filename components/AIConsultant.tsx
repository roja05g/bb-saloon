import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User } from 'lucide-react';
import { ChatMessage } from '../types';
import { Button } from './Button';

export const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Bonjour! I'm Lumi, your personal style consultant. Describe your hair type, face shape, or what you're looking for, and I'll help you find the perfect look." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Pass history excluding the very last user message which is 'newMessage' in the service call logic
      // Actually, for simplicity in the service wrapper, passing the full previous history is safer
      // The service wrapper reconstructs history.
      
      const aiMessage: ChatMessage = { role: 'model', text: '' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-100px)] flex flex-col">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-amber-600" />
        </div>
        <h2 className="text-3xl font-serif text-stone-900 mb-2">Ask Lumi</h2>
        <p className="text-stone-600">Your AI-powered personal hair & beauty consultant</p>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col border border-stone-100">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-stone-50/50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-stone-200' : 'bg-stone-900'
              }`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} className="text-white" />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-white text-stone-800 shadow-sm rounded-tr-none border border-stone-100' 
                  : 'bg-stone-900 text-stone-50 rounded-tl-none shadow-md'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center flex-shrink-0">
                <Bot size={20} className="text-white" />
              </div>
              <div className="bg-stone-900 text-stone-50 p-4 rounded-2xl rounded-tl-none shadow-md">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-stone-100">
          <div className="flex gap-2 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="E.g., What color suits olive skin?"
              className="w-full bg-stone-50 border border-stone-200 rounded-full pl-6 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 p-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 disabled:opacity-50 disabled:hover:bg-stone-900 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="text-xs text-center text-stone-400 mt-2">
            Lumi can make mistakes. Please consult with our stylists for final decisions.
          </div>
        </div>
      </div>
    </div>
  );
};