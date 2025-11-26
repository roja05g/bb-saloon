import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct the chat history for the model
    // The SDK manages history in a specific way, but for a simple stateless request wrapper
    // or to use generateContent with context, we can format it.
    // However, for a conversational flow, using ai.chats.create is better.
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: `You are 'Lumi', the AI Style Consultant for Lumière Salon. 
        Your goal is to help clients choose hairstyles, colors, and treatments.
        Your tone is chic, professional, warm, and knowledgeable.
        Keep responses concise (under 100 words unless detailed advice is asked).
        If asked about prices, refer them to the Services page generally (e.g., "Our cuts start at $85").
        Do not make definitive medical diagnoses for scalp conditions; suggest seeing a specialist.
        Always be polite and encourage them to book an appointment for a full consultation.`,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I'm having a bad hair day and couldn't process that. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm having trouble connecting to my style database right now. Please try again later.";
  }
};
