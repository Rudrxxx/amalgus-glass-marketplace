import { NextRequest, NextResponse } from 'next/server';
import { getGemini, GLASS_SYSTEM_PROMPT } from '@/lib/gemini';
import { AIMatchResult } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { query, role } = await request.json();

    if (!query || query.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please describe your glass requirement in more detail.' },
        { status: 400 }
      );
    }

    const genAI = getGemini();
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: GLASS_SYSTEM_PROMPT,
    });

    const userMessage = role ? `I am a ${role}. ${query}` : query;

    const response = await model.generateContent(userMessage);
    const rawText = response.response.text();

    let result: AIMatchResult;
    try {
      const cleaned = rawText.replace(/```json|```/g, '').trim();
      result = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: 'Could not parse AI response. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ result });
  } catch (error: unknown) {
    console.error('AI Match error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: `AI service error: ${message}` }, { status: 500 });
  }
}
