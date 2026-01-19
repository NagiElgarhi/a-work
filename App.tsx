
import React, { useState, useRef } from 'react';
import { Layout } from './components/Layout';
import { ChatInterface } from './components/ChatInterface';
import { Calculator } from './components/Calculator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'calc' | 'law'>('chat');
  const chatSectionRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: 'chat' | 'calc' | 'law') => {
    setActiveTab(tab);
    // إذا اختار المستخدم استشارة، نقوم بالتمرير لخانة الدردشة مباشرة
    if (tab === 'chat') {
      setTimeout(() => {
        chatSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <Layout>
      <div className="mb-8 md:mb-16 text-center px-2">
        <div className="inline-block mb-3 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-[9px] md:text-[10px] font-black tracking-widest uppercase border border-amber-200">
          المرجع الشامل ٢٠٢٥
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-emerald-950 mb-4 md:mb-6 legal-font leading-tight">
          موسوعة <span className="text-amber-600">قانون العمل</span> المصري
        </h2>
        <p className="text-slate-500 max-w-3xl mx-auto text-base md:text-xl font-medium leading-relaxed px-4">
          نظام خبير مدعوم بالذكاء الاصطناعي لتفسير نصوص القانون وحماية حقوقك وفق أحدث التشريعات.
        </p>
      </div>

      <div className="flex justify-center mb-8 px-2 sticky top-[70px] z-40 md:static">
        <div className="grid grid-cols-3 w-full max-w-md md:max-w-none md:inline-flex p-1 bg-emerald-950/90 md:bg-emerald-950/5 backdrop-blur-md rounded-2xl md:rounded-[2rem] shadow-xl border border-emerald-900/10 gap-1">
          {[
            { id: 'chat', label: 'استشارة', icon: '⚖️' },
            { id: 'calc', label: 'حاسبة', icon: '💰' },
            { id: 'law', label: 'أرشيف', icon: '📜' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => handleTabChange(tab.id as any)}
              className={`py-3 md:px-10 md:py-3.5 rounded-xl md:rounded-[1.8rem] font-black text-[11px] md:text-sm transition-all flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 ${activeTab === tab.id ? 'bg-amber-500 text-emerald-950 shadow-xl scale-100 md:scale-105' : 'text-white md:text-emerald-900/60'}`}
            >
              <span className="text-lg md:text-base">{tab.icon}</span>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
        <div className="lg:col-span-8" ref={chatSectionRef}>
          {activeTab === 'chat' && <ChatInterface />}
          {activeTab === 'calc' && <Calculator />}
          {activeTab === 'law' && (
            <div className="glass-card rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-10 border border-amber-600/10">
              <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 text-emerald-950 border-b border-amber-600/20 pb-4 md:pb-6 legal-font italic">النشرة التشريعية لعام ٢٠٢٥</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {[
                  { title: 'إلغاء الاستقالات المسبقة', color: 'border-amber-500', bg: 'bg-amber-50', icon: '✍️' },
                  { title: 'ضوابط التثبيت الإلزامي', color: 'border-emerald-500', bg: 'bg-emerald-50', icon: '📌' },
                  { title: 'المحاكم العمالية المتخصصة', color: 'border-blue-500', bg: 'bg-blue-50', icon: '🏛️' },
                  { title: 'حماية أمومة العاملات', color: 'border-rose-500', bg: 'bg-rose-50', icon: '🤱' }
                ].map((item, idx) => (
                  <div key={idx} className={`${item.bg} p-5 rounded-xl border-r-4 md:border-r-8 ${item.color} shadow-sm transition-all`}>
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="font-black text-slate-800 mb-1 text-sm md:text-base">{item.title}</h4>
                    <p className="text-[11px] md:text-sm text-slate-600 leading-relaxed font-medium">مراجعة شاملة للمواد المنظمة لضمان أعلى مستويات العدالة.</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6 md:space-y-8">
          <div className="bg-emerald-950 text-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl relative overflow-hidden">
            <h3 className="text-lg font-black mb-4 md:mb-6 text-amber-500 legal-font flex items-center gap-2">
              <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
              مكتبة المراجع
            </h3>
            <ul className="space-y-3 font-bold text-xs md:text-sm">
              <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition">
                <span className="text-amber-500 font-black">٠١</span> الجريدة الرسمية للدولة
              </li>
              <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition">
                <span className="text-amber-500 font-black">٠٢</span> أحكام محكمة النقض
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-slate-200">
            <h3 className="text-lg font-black mb-4 text-emerald-950 legal-font">حقائق سريعة</h3>
            <div className="space-y-3">
               <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[9px] uppercase font-black text-amber-600 mb-1">المادة ١٢٠</p>
                  <p className="text-[11px] font-bold text-slate-700">يحظر فصل العامل بسبب الانتماء النقابي.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
