
import React, { useState, useRef } from 'react';
import { Layout } from './components/Layout';
import { ChatInterface } from './components/ChatInterface';
import { Calculator } from './components/Calculator';

const LAW_DATABASE = [
  { id: 1, title: 'المادة ١٢: عقود العمل', category: 'العقود', content: 'يجب أن يكون عقد العمل ثابتاً بالكتابة، ومحرراً باللغة العربية من ثلاث نسخ، تودع نسخة منه لدى مكتب التأمينات الاجتماعية المختص.', penalty: 'غرامة تصل إلى ٥٠٠٠ جنيه عن كل عامل.' },
  { id: 2, title: 'المادة ٤٧: الإجازات السنوية', category: 'الإجازات', content: 'تكون مدة الإجازة السنوية ٢١ يوماً بأجر كامل لمن أمضى سنة كاملة في الخدمة، وتزداد إلى ثلاثين يوماً متى أمضى العامل عشر سنوات في الخدمة.', penalty: 'إلزام صاحب العمل بصرف مقابل نقدي عن أيام الإجازة.' },
  { id: 3, title: 'المادة ٧٠: ساعات العمل', category: 'ساعات العمل', content: 'لا يجوز تشغيل العامل تشغيلاً فعلياً أكثر من ثماني ساعات في اليوم أو ثمان وأربعين ساعة في الأسبوع، ولا تدخل فيها الفترات المخصصة لتناول الطعام والراحة.', penalty: 'احتساب ساعات عمل إضافية بأجر مضاعف.' },
  { id: 4, title: 'المادة ١٢٠: حظر الفصل التعسفي', category: 'إنهاء الخدمة', content: 'لا يعتبر من المبررات المشروعة والكافية لإنهاء عقد العمل: اللون أو الجنس أو الحالة الاجتماعية أو الانتماء النقابي أو ممارسة الأنشطة النقابية.', penalty: 'التعويض بما لا يقل عن أجر شهرين عن كل سنة خدمة.' }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'calc' | 'law' | null>(null);
  const [selectedLaw, setSelectedLaw] = useState<typeof LAW_DATABASE[0] | null>(null);
  const contentSectionRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: 'chat' | 'calc' | 'law') => {
    setActiveTab(tab);
    setTimeout(() => {
      contentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <Layout>
      <div className="mb-8 md:mb-16 text-center px-2">
        <div className="inline-block mb-3 px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-[14px] font-black tracking-widest uppercase border border-amber-200">
          المرجع الشامل ٢٠٢٥
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-emerald-950 mb-6 md:mb-8 legal-font leading-tight">
          موسوعة <span className="text-amber-600">قانون العمل</span> المصري
        </h2>
        <p className="text-slate-600 max-w-3xl mx-auto text-lg md:text-2xl font-bold leading-relaxed px-4">
          نظام خبير مدعوم بالذكاء الاصطناعي لتفسير نصوص القانون وحماية حقوقك وفق أحدث التشريعات.
        </p>
      </div>

      <div className="flex justify-center mb-10 px-2 sticky top-[60px] md:top-[75px] z-40 md:static">
        <div className="grid grid-cols-3 w-full max-w-2xl md:max-w-none md:inline-flex p-1.5 bg-emerald-950/95 md:bg-emerald-950/5 backdrop-blur-md rounded-2xl md:rounded-[2.5rem] shadow-xl border border-emerald-900/10 gap-2">
          {[
            { id: 'chat', label: 'استشارة', icon: '⚖️' },
            { id: 'calc', label: 'حاسبة', icon: '💰' },
            { id: 'law', label: 'أرشيف', icon: '📜' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => handleTabChange(tab.id as any)}
              className={`py-4 md:px-14 md:py-5 rounded-xl md:rounded-[2rem] font-black text-lg md:text-xl transition-all flex flex-col md:flex-row items-center justify-center gap-2 ${activeTab === tab.id ? 'bg-amber-500 text-emerald-950 shadow-xl scale-100 md:scale-105' : 'text-white md:text-emerald-900/60'}`}
            >
              <span className="text-2xl md:text-xl">{tab.icon}</span>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 min-h-[500px]">
        <div className="lg:col-span-8" ref={contentSectionRef}>
          {activeTab === 'chat' && <ChatInterface />}
          {activeTab === 'calc' && <Calculator />}
          {activeTab === 'law' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="glass-card rounded-2xl md:rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-amber-600/10">
                <h3 className="text-3xl md:text-4xl font-black mb-10 text-emerald-950 border-b-2 border-amber-600/20 pb-6 legal-font">الأرشيف القانوني التفاعلي</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {LAW_DATABASE.map((law) => (
                    <div 
                      key={law.id}
                      onClick={() => setSelectedLaw(law)}
                      className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-xl hover:border-amber-400 transition-all cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-1.5 h-full bg-emerald-800 group-hover:bg-amber-500 transition-colors"></div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-black text-amber-700 bg-amber-50 px-3 py-1 rounded-full">{law.category}</span>
                      </div>
                      <h4 className="text-xl font-black text-emerald-950 mb-2">{law.title}</h4>
                      <p className="text-lg text-slate-600 line-clamp-2 leading-relaxed font-bold">{law.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 rounded-2xl p-8 border-2 border-amber-200">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl">📢</span>
                  <h4 className="text-xl font-black text-amber-900">تحديثات هامة ٢٠٢٥</h4>
                </div>
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="w-2.5 h-2.5 bg-amber-600 rounded-full mt-2.5 shrink-0"></div>
                    <p className="text-amber-800 font-black text-lg">تفعيل نظام التقاضي الإلكتروني في المنازعات العمالية لسرعة الفصل.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2.5 h-2.5 bg-amber-600 rounded-full mt-2.5 shrink-0"></div>
                    <p className="text-amber-800 font-black text-lg">تغليظ عقوبات تشغيل الأطفال دون السن القانوني أو في أعمال خطرة.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!activeTab && (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white/40 rounded-[2.5rem] border-4 border-dashed border-emerald-900/10">
              <div className="text-7xl mb-6 opacity-20">⚖️</div>
              <h3 className="text-emerald-950 font-black text-2xl mb-4">مرحباً بك في المنصة</h3>
              <p className="text-slate-600 text-lg max-w-sm font-bold">يرجى اختيار أحد الخيارات أعلاه للبدء في الاستشارة أو الحسابات أو تصفح الأرشيف.</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-emerald-950 text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
            <h3 className="text-xl font-black mb-8 text-amber-500 legal-font flex items-center gap-3">
              <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
              مكتبة المراجع
            </h3>
            <ul className="space-y-4 font-black text-lg">
              <li className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition">
                <span className="text-amber-500 font-black">٠١</span> الجريدة الرسمية للدولة
              </li>
              <li className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition">
                <span className="text-amber-500 font-black">٠٢</span> أحكام محكمة النقض
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
            <h3 className="text-xl font-black mb-6 text-emerald-950 legal-font">حقائق سريعة</h3>
            <div className="space-y-4">
               <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-xs uppercase font-black text-amber-600 mb-2">المادة ١٢٠</p>
                  <p className="text-lg font-black text-slate-700 leading-normal">يحظر فصل العامل بسبب الانتماء النقابي أو ممارسة الأنشطة النقابية.</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {selectedLaw && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden border-2 border-amber-500/20">
            <div className="bg-emerald-900 p-8 text-white flex justify-between items-center">
              <div>
                <span className="text-xs font-black uppercase text-amber-400 tracking-widest">{selectedLaw.category}</span>
                <h4 className="text-2xl font-black legal-font mt-1">{selectedLaw.title}</h4>
              </div>
              <button onClick={() => setSelectedLaw(null)} className="p-3 hover:bg-white/10 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-10 space-y-8">
              <div>
                <h5 className="text-sm font-black text-emerald-800 uppercase mb-3">نص المادة القانونية</h5>
                <p className="text-slate-800 leading-relaxed font-black text-xl bg-slate-50 p-6 rounded-2xl border border-slate-100">{selectedLaw.content}</p>
              </div>
              <div className="p-6 bg-rose-50 border-2 border-rose-100 rounded-2xl">
                <h5 className="text-sm font-black text-rose-800 uppercase mb-2">العقوبة المقررة</h5>
                <p className="text-lg font-black text-rose-900">{selectedLaw.penalty}</p>
              </div>
              <button 
                onClick={() => setSelectedLaw(null)}
                className="w-full bg-emerald-900 text-amber-400 font-black text-xl py-5 rounded-2xl shadow-lg hover:bg-emerald-950 transition-all"
              >
                فهمت النص القانوني
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
