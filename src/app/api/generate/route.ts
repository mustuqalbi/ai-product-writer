import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Simple in-memory rate limiter: max 10 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= 10) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please wait a minute before trying again." }, { status: 429 });
    }

    const { productName, category, features, tone } = await req.json();

    if (!productName || !features) {
      return NextResponse.json({ error: "Product name and features are required." }, { status: 400 });
    }

    const toneGuide: Record<string, string> = {
      professional: "formal, trustworthy, and benefit-focused",
      casual: "friendly, conversational, and relatable",
      luxury: "premium, exclusive, and aspirational",
      playful: "fun, energetic, and creative",
    };

    const prompt = `You are an expert Shopify product copywriter. Write a compelling product description.

Product Name: ${productName}
Category: ${category || "General"}
Key Features: ${features}
Tone: ${toneGuide[tone] || toneGuide.professional}

Write a product description with:
1. A punchy 1-sentence hook (make it exciting)
2. 2-3 sentences highlighting key benefits (not just features)
3. A short bullet list of 3-4 top features
4. A 1-sentence call to action

Keep it between 120-180 words. Optimized for Shopify. Do not add a title.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
      temperature: 0.8,
    });

    const description = response.choices[0]?.message?.content?.trim() || "";
    return NextResponse.json({ description });
  } catch {
    return NextResponse.json({ error: "Failed to generate description." }, { status: 500 });
  }
}
