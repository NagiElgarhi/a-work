
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface CalculationResult {
  title: string;
  value: string;
  description: string;
}

export enum LawTopic {
  Wages = 'الأجور والعلاوات',
  Leaves = 'الإجازات والعطلات',
  Termination = 'إنهاء الخدمة والمكافآت',
  WorkingHours = 'ساعات العمل والراحة',
  Discipline = 'الجزاءات والتأديب',
  Contracts = 'أنواع العقود والتوظيف'
}
