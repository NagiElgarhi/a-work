
import React, { useState } from 'react';

export const Calculator: React.FC = () => {
  const [salary, setSalary] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [reason, setReason] = useState<'resignation' | 'termination'>('termination');
  const [result, setResult] = useState<number | null>(null);

  const calculateBenefit = () => {
    const totalYears = years + (months / 12);
    let amount = 0;
    if (totalYears <= 5) {
      amount = totalYears * (salary * 0.5);
    } else {
      amount = (5 * (salary * 0.5)) + ((totalYears - 5) * salary);
    }
    if (reason === 'resignation' && totalYears < 2) {
      amount = 0;
    } else if (reason === 'resignation' && totalYears < 5) {
      amount = amount * 0.33;
    } else if (reason === 'resignation' && totalYears < 10) {
      amount = amount * 0.66;
    }
    setResult(Math.round(amount));
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-slate-200">
      <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 002-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        حاسبة مكافأة نهاية الخدمة
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-lg font-black text-slate-700 mb-2">الراتب الأساسي الأخير (بالجنيه)</label>
          <input
            type="number"
            value={salary || ''}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="w-full border-2 border-slate-200 rounded-2xl px-6 py-4 text-xl font-black focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
            placeholder="مثال: 10000"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-black text-slate-700 mb-2">عدد سنوات الخدمة</label>
            <input
              type="number"
              value={years || ''}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full border-2 border-slate-200 rounded-2xl px-6 py-4 text-xl font-black focus:ring-4 focus:ring-emerald-500/20 outline-none"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-lg font-black text-slate-700 mb-2">عدد الشهور الإضافية</label>
            <input
              type="number"
              value={months || ''}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full border-2 border-slate-200 rounded-2xl px-6 py-4 text-xl font-black focus:ring-4 focus:ring-emerald-500/20 outline-none"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-black text-slate-700 mb-2">سبب إنهاء العلاقة</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value as any)}
            className="w-full border-2 border-slate-200 rounded-2xl px-6 py-4 text-xl font-black focus:ring-4 focus:ring-emerald-500/20 outline-none appearance-none bg-white"
          >
            <option value="termination">فصل أو انتهاء عقد</option>
            <option value="resignation">استقالة</option>
          </select>
        </div>

        <button
          onClick={calculateBenefit}
          className="w-full bg-emerald-900 text-amber-400 font-black text-xl py-5 rounded-2xl hover:bg-emerald-950 transition-all shadow-xl mt-6"
        >
          احسب المستحقات التقريبية
        </button>

        {result !== null && (
          <div className="mt-8 p-8 bg-emerald-50 border-2 border-emerald-200 rounded-3xl text-center">
            <span className="text-slate-700 block mb-2 text-xl font-bold">المكافأة المقدرة:</span>
            <span className="text-4xl md:text-5xl font-black text-emerald-800">{result.toLocaleString()} جنيه مصري</span>
            <p className="text-sm text-slate-500 mt-4 italic font-bold">ملاحظة: هذه نتائج تقريبية تخضع للخصومات التأمينية.</p>
          </div>
        )}
      </div>
    </div>
  );
};
