import { NextRequest, NextResponse } from "next/server";
import { improveText } from "@/features/editor/lib/improveText";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }
    const improvedText = await improveText(text);
    return NextResponse.json({ improvedText }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
