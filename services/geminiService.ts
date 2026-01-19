
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `أنت خبير قانوني متخصص في قانون العمل المصري الجديد (تحديثات 2024/2025). 

قواعد صارمة للإجابة:
1. يجب أن تستند كل إجابة إلى نصوص قانون العمل المصري الصريحة.
2. **إلزامي**: عند الإجابة على أي استفسار، يجب عليك ذكر رقم المادة القانونية (مثلاً: وفقاً للمادة رقم 12 من القانون...) وشرح مضمونها بوضوح.
3. إذا كان السؤال يتعلق بتعديل جديد في 2024/2025، وضح الفرق بين النص القديم والجديد.
4. يجب أن يكون أسلوبك مهنياً، دقيقاً، وداعماً بالمواد القانونية لكل جزئية في ردك.
5. إذا كانت المسألة خاضعة لتقدير المحكمة العمالية، اذكر ذلك بناءً على المادة المختصة.
6. اذكر العقوبات المقررة في القانون في حال مخالفة صاحب العمل للمادة المذكورة إن وجدت.`;

export const getLegalConsultancy = async (userPrompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.3, // تقليل درجة التنوع لزيادة الدقة القانونية
        topP: 0.9,
      },
    });
    return response.text || "عذراً، حدث خطأ في معالجة طلبك. حاول مرة أخرى.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "حدث خطأ أثناء الاتصال بالمستشار القانوني الذكي. يرجى التحقق من الاتصال بالإنترنت.";
  }
};
