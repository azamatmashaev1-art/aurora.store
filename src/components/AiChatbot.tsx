import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hello. I'm your Lumière personal shopping assistant. How may I help you find the perfect product today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Initial assistant message placeholder
    const assitantId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assitantId, role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content, history: messages.slice(1) })
      });

      if (!res.ok) throw new Error('Chat API failed');
      
      const reader = res.body?.getReader();
      const decoder = new TextDecoder('utf-8');

      if (reader) {
        let isDone = false;
        while (!isDone) {
          const { value, done } = await reader.read();
          isDone = done;
          if (value) {
            const chunkRow = decoder.decode(value);
            const lines = chunkRow.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const dataStr = line.slice(6);
                if (dataStr === '[DONE]') break;
                try {
                  const data = JSON.parse(dataStr);
                  if (data.text) {
                    setMessages(prev => prev.map(m => 
                      m.id === assitantId ? { ...m, content: m.content + data.text } : m
                    ));
                  }
                } catch (e) {}
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: 'Ah, I apologize. It seems I am having trouble connecting to my service at the moment.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center justify-center cursor-pointer"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div 
          className={`fixed right-6 bottom-6 z-50 bg-white border border-slate-200 shadow-2xl rounded-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'w-[400px] h-[650px]' : 'w-[350px] h-[500px]'
          }`}
        >
          {/* Header */}
          <div className="bg-black text-white p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-medium text-sm">Lumière Concierge</span>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsExpanded(!isExpanded)} className="p-1 hover:bg-white/10 rounded">
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-2 shrink-0">
                    <Bot className="w-4 h-4 text-slate-600" />
                  </div>
                )}
                <div 
                  className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#0F62FE] text-white rounded-tr-none' 
                      : 'bg-white border border-slate-100 shadow-sm text-slate-800 rounded-tl-none'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                     <div className="prose prose-sm prose-slate max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                     </div>
                  ) : (
                    msg.content
                  )}
                  {msg.role === 'assistant' && msg.content === '' && (
                    <span className="animate-pulse">...</span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-100 shrink-0">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our products..."
                className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 p-1.5 bg-black text-white rounded-full disabled:opacity-50 hover:bg-slate-800 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
