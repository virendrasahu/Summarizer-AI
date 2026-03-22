import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_PROMPT, getSummarizationPrompt } from './prompt.js';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

export async function summarizeText(text) {
  try {
    const prompt = `${SYSTEM_PROMPT}\n\n${getSummarizationPrompt(text)}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let content = response.text();

    // Gemini sometimes wraps JSON in markdown code blocks like ```json ... ```
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      return JSON.parse(content);
    } catch (parseError) {
      console.error('Gemini JSON Parse Error. Raw content:', content);
      throw new Error('LLM Error: Failed to parse structured response from Gemini.');
    }
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    
    if (error.message.includes('API_KEY_INVALID')) {
      throw new Error('LLM Error: Invalid Gemini API key. Please check your .env file.');
    }
    
    throw new Error(`LLM Error: ${error.message || 'Failed to process text with Gemini.'}`);
  }
}
