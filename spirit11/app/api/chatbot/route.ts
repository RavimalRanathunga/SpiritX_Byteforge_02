import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Missing message in request" },
        { status: 400 }
      );
    }

    // Use Gemini 1.5 Pro or Gemini 1.5 Flash
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash', // or 'gemini-1.5-flash'
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const prompt = `Act as Spiriter, a Cricket assistant, Assists users with team selection and player insights. 
      Rules:
      1. Suggest player lineups and strategies
      2. Never mention exact points
      3. Keep responses under 100 words
      
      User query: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}