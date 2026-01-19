
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

    // Simplified calculation based on Egyptian Labor Law basics:
    // First 5 years: half month for each year
    // After 5 years: full month for each year
    if (totalYears <= 5) {
      amount = totalYears * (salary * 0.5);
    } else {
      amount = (5 * (salary * 0.5)) + ((totalYears - 5) * salary);
    }

    // Adjustment for resignation (usually different rules apply, simplified here)
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
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 002-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        حاسبة مكافأة نهاية الخدمة
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">الراتب الأساسي الأخير (بالجنيه)</label>
          <input
            type="number"
            value={salary || ''}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="w-full border border-slate-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500"
            placeholder="مثال: 10000"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">عدد سنوات الخدمة</label>
            <input
              type="number"
              value={years || ''}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">عدد الشهور الإضافية</label>
            <input
              type="number"
              value={months || ''}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">سبب إنهاء العلاقة التعاقدية</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value as any)}
            className="w-full border border-slate-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="termination">فصل أو انتهاء عقد</option>
            <option value="resignation">استقالة</option>
          </select>
        </div>

        <button
          onClick={calculateBenefit}
          className="w-full bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-900 transition mt-4"
        >
          احسب المستحقات التقريبية
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
            <span className="text-slate-600 block mb-1">المكافأة المقدرة:</span>
            <span className="text-3xl font-black text-emerald-700">{result.toLocaleString()} جنيه مصري</span>
            <p className="text-xs text-slate-500 mt-2 italic">ملاحظة: هذه نتائج تقريبية وقد تختلف حسب اللوائح الداخلية والخصومات التأمينية.</p>
          </div>
        )}
      </div>
    </div>
  );
};
