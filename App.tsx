
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
  // الحالة الافتراضية هي 'law' لعرض الأرشيف أولاً، أو null لإخفاء المحتوى تماماً حتى الاختيار
  const [activeTab, setActiveTab] = useState<'chat' | 'calc' | 'law' | null>(null);
  const [selectedLaw, setSelectedLaw] = useState<typeof LAW_DATABASE[0] | null>(null);
  const contentSectionRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: 'chat' | 'calc' | 'law') => {
    setActiveTab(tab);
    // تمرير تلقائي للمحتوى عند الاختيار لضمان رؤية النتيجة فوراً
    setTimeout(() => {
      contentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
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

      <div className="flex justify-center mb-8 px-2 sticky top-[60px] md:top-[75px] z-40 md:static">
        <div className="grid grid-cols-3 w-full max-w-md md:max-w-none md:inline-flex p-1 bg-emerald-950/95 md:bg-emerald-950/5 backdrop-blur-md rounded-2xl md:rounded-[2rem] shadow-xl border border-emerald-900/10 gap-1">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 min-h-[400px]">
        <div className="lg:col-span-8" ref={contentSectionRef}>
          {activeTab === 'chat' && <ChatInterface />}
          {activeTab === 'calc' && <Calculator />}
          {activeTab === 'law' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="glass-card rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-10 border border-amber-600/10">
                <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 text-emerald-950 border-b border-amber-600/20 pb-4 md:pb-6 legal-font italic">الأرشيف القانوني التفاعلي</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {LAW_DATABASE.map((law) => (
                    <div 
                      key={law.id}
                      onClick={() => setSelectedLaw(law)}
                      className="group bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-400 transition-all cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-1 h-full bg-emerald-800 group-hover:bg-amber-500 transition-colors"></div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{law.category}</span>
                        <span className="text-emerald-900 opacity-30">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </span>
                      </div>
                      <h4 className="font-black text-emerald-950 mb-1">{law.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{law.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">📢</span>
                  <h4 className="font-black text-amber-900">تحديثات هامة ٢٠٢٥</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 shrink-0"></div>
                    <p className="text-amber-800 font-bold text-xs">تفعيل نظام التقاضي الإلكتروني في المنازعات العمالية لسرعة الفصل.</p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 shrink-0"></div>
                    <p className="text-amber-800 font-bold text-xs">تغليظ عقوبات تشغيل الأطفال دون السن القانوني أو في أعمال خطرة.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!activeTab && (
            <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-white/40 rounded-3xl border-2 border-dashed border-emerald-900/10">
              <div className="text-5xl mb-4 opacity-20">⚖️</div>
              <h3 className="text-emerald-950 font-black text-xl mb-2">مرحباً بك في المنصة</h3>
              <p className="text-slate-500 text-sm max-w-xs">يرجى اختيار أحد الخيارات أعلاه للبدء في الاستشارة أو الحسابات أو تصفح الأرشيف.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
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
                  <p className="text-xs font-bold text-slate-700 leading-tight">يحظر فصل العامل بسبب الانتماء النقابي أو ممارسة الأنشطة النقابية.</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {selectedLaw && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-amber-500/20">
            <div className="bg-emerald-900 p-6 text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-widest">{selectedLaw.category}</span>
                <h4 className="text-xl font-black legal-font">{selectedLaw.title}</h4>
              </div>
              <button onClick={() => setSelectedLaw(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <h5 className="text-xs font-black text-emerald-800 uppercase mb-2 tracking-tighter">نص المادة</h5>
                <p className="text-slate-700 leading-relaxed font-bold text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">{selectedLaw.content}</p>
              </div>
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl">
                <h5 className="text-[10px] font-black text-rose-800 uppercase mb-1">العقوبة المقررة</h5>
                <p className="text-xs font-bold text-rose-900">{selectedLaw.penalty}</p>
              </div>
              <button 
                onClick={() => setSelectedLaw(null)}
                className="w-full bg-emerald-900 text-amber-400 font-black py-4 rounded-xl shadow-lg hover:bg-emerald-950 transition-all"
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
