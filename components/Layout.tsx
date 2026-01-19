
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-emerald-950 text-white shadow-2xl sticky top-0 z-50 border-b border-amber-600/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-400 to-amber-700 p-2 rounded-full shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-7 md:h-7 text-emerald-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 013 11V7a4 4 0 014-4h4a4 4 0 014 4v4c0 2.664-1.033 5.088-2.72 6.885M12 11c1.285 1.838 3.07 3.407 5.177 4.544M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-black tracking-tight legal-font text-amber-500">ميزان العدالة</h1>
              <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-emerald-300 font-bold">قانون العمل ٢٠٢٥</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 font-bold text-xs uppercase tracking-wide">
            <a href="#" className="text-amber-500 border-b-2 border-amber-500 pb-1">الرئيسية</a>
            <a href="#" className="hover:text-amber-400 transition-colors">الحسابات</a>
            <a href="#" className="hover:text-amber-400 transition-colors">الأرشيف</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {children}
      </main>

      <footer className="bg-emerald-950 text-emerald-200/50 py-8 border-t border-amber-900/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold">© ٢٠٢٥ • منصة الاستشارات القانونية</p>
          <p className="text-[9px] mt-2 italic opacity-40">العدل أساس الملك</p>
        </div>
      </footer>
    </div>
  );
};
