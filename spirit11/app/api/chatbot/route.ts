import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Temporary storage for demonstration (use database in production)
const chatSessions = new Map<string, boolean>();

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json();

    // Check if it's a new session
    const isNewSession = !chatSessions.has(sessionId);
    
    // Generate greeting for new sessions
    let greeting = '';
    if (isNewSession) {
      greeting = "Hello player! How can I assist you with your cricket team today?\n\n";
      chatSessions.set(sessionId, true);
    }

    if (!message) {
      return NextResponse.json(
        { error: "Missing message in request" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { maxOutputTokens: 100 },
    });

    const prompt = `${greeting}Act as Spiriter, a Cricket assistant. Follow these rules:
      1. Suggest player lineups and strategies
      2. Never mention exact points
      3. Keep responses under 100 words
      
      User query: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ 
      reply: text,
      sessionId,
      isNewSession
    });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}