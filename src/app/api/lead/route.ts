import { NextResponse } from "next/server";

/**
 * Mock lead endpoint for v1.
 * In production this writes to CRM (HubSpot/GHL/etc.) and triggers SMS to the location's coach.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("[westcore:lead-api] new lead", {
      ts: new Date().toISOString(),
      ...body,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
