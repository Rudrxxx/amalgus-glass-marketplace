// app/api/ai-match/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getGemini, GLASS_SYSTEM_PROMPT } from '@/lib/gemini';
import { ruleBasedMatch } from '@/lib/ruleBasedMatch';
import { AIMatchResult } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { query, role } = await request.json();

    if (!query || query.trim().length < 3) {
      return NextResponse.json(
        { error: 'Please describe your glass requirement in more detail.' },
        { status: 400 }
      );
    }

    const userMessage = role ? `I am a ${role}. ${query}` : query;

    // Try Gemini first
    const genAI = getGemini();
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          systemInstruction: GLASS_SYSTEM_PROMPT,
        });

        const response = await model.generateContent(userMessage);
        const rawText = response.response.text();

        const cleaned = rawText.replace(/```json|```/g, '').trim();
        const result: AIMatchResult = JSON.parse(cleaned);
        return NextResponse.json({ result, source: 'ai' });
      } catch {
        // AI failed — fall through to rule-based
      }
    }

    // Rule-based fallback
    const result = ruleBasedMatch(query, role);
    return NextResponse.json({ result, source: 'rules' });
  } catch (error: unknown) {
    console.error('AI Match error:', error);
    // Even on catastrophic errors, return something useful
    const result = ruleBasedMatch('general', null);
    return NextResponse.json({ result, source: 'rules' });
  }
}
