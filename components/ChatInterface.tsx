
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getLegalConsultancy } from '../services/geminiService';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'مرحباً بكم. أنا مستشاركم القانوني الرقمي، جاهز لتحليل استفساراتكم وتدعيمها بنصوص قانون العمل لعام ٢٠٢٥. تفضلوا بطرح سؤالكم.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    const response = await getLegalConsultancy(input);
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-EG';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const downloadPDF = () => {
    const content = messages.map(m => `${m.role === 'user' ? 'السائل' : 'المستشار'}:\n${m.content}\n\n`).join('--- \n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `وثيقة_قانونية.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-card rounded-2xl md:rounded-3xl shadow-xl flex flex-col h-[550px] md:h-[700px] border border-emerald-900/10 overflow-hidden">
      {/* Header */}
      <div className="bg-emerald-950 p-3 md:p-5 flex items-center justify-between border-b border-amber-600/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-500 rounded-full flex items-center justify-center text-emerald-950 font-black text-lg shadow-inner">ع</div>
          <div>
            <h3 className="text-white font-bold leading-none legal-font text-sm md:text-lg">المستشار الذكي</h3>
            <p className="text-emerald-400 text-[8px] md:text-[10px] mt-1 font-black uppercase tracking-wider">Expert Counsel</p>
          </div>
        </div>
        <button 
          onClick={downloadPDF}
          className="bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-lg md:rounded-xl transition-all flex items-center gap-1.5 text-[10px] md:text-xs font-bold shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="hidden xs:inline">تصدير</span>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] md:max-w-[85%] rounded-xl md:rounded-2xl p-4 md:p-5 shadow-lg relative transition-all ${
              m.role === 'user' 
                ? 'bg-emerald-900 text-emerald-50 rounded-tr-none border border-emerald-700/50' 
                : 'bg-white border-l-4 border-amber-600 text-slate-800 rounded-tl-none'
            }`}>
              <p className={`whitespace-pre-wrap leading-relaxed ${m.role === 'assistant' ? 'legal-font text-base md:text-lg' : 'font-semibold text-xs md:text-sm'}`}>
                {m.content}
              </p>
              
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-100/10">
                <span className="text-[9px] opacity-40 font-bold">{m.timestamp.toLocaleTimeString('ar-EG', {hour: '2-digit', minute:'2-digit'})}</span>
                {m.role === 'assistant' && (
                  <button 
                    onClick={() => speakText(m.content)}
                    className="flex items-center gap-1.5 text-amber-700 font-black text-[10px] md:text-xs"
                  >
                    <div className="bg-amber-100 p-1 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9H2v6h4l5 4V5z" />
                      </svg>
                    </div>
                    استماع
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-emerald-100 rounded-xl p-3 flex gap-2 items-center shadow-sm">
              <div className="w-1.5 h-1.5 bg-emerald-800 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-emerald-800 rounded-full animate-bounce [animation-delay:-.3s]"></div>
              <p className="text-[10px] font-black text-emerald-800 italic">جاري مراجعة المواد...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 md:p-6 bg-emerald-50 border-t border-emerald-900/10">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اكتب سؤالك هنا..."
            className="w-full bg-white border border-emerald-900/10 rounded-xl md:rounded-2xl px-4 py-3 md:px-6 md:py-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-emerald-900 text-amber-400 p-2 rounded-lg md:rounded-xl disabled:opacity-30 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
