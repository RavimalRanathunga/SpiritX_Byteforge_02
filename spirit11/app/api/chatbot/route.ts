import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Store this in .env
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are Spiriter, an AI assistant for fantasy football. You provide player details and suggest the best team. Never reveal player points." },
        { role: "user", content: message }
      ],
      max_tokens: 100,
    });

    return NextResponse.json({ reply: response.choices[0]?.message?.content || "I'm not sure how to respond to that." });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
