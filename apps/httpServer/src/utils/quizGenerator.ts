import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function quizGenerator({
  topic,
  difficulty,
  note,
  questions,
}: {
  topic: string;
  difficulty: string;
  note: string;
  questions: string;
}) {
  const prompt = `
Create a ${difficulty} level quiz on the topic "${topic}".
The quiz must contain ${questions} questions.
${note ? `Note: ${note}` : ""}

Return the output in **strict JSON format** like this example:

{
  "title": "Your Quiz Title",
  "description": "A short description of the quiz topic and difficulty.",
  "quiz": [
    {
      "question": "Question text here",
      "options": [
        { "text": "Option A", "isCorrect": false },
        { "text": "Option B", "isCorrect": true },
        { "text": "Option C", "isCorrect": false },
        { "text": "Option D", "isCorrect": false }
      ],
      "points": 10
    }
  ]
}

Do not include any text, explanation, or markdown before or after the JSON.
Return only valid JSON.
`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      temperature: 0.1,
    },
  });

  return response.text;
}
