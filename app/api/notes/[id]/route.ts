import { NextRequest, NextResponse } from "next/server";
import { fetchNoteById } from "../../../../lib/api"; 

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const note = await fetchNoteById(params.id);
    if (!note) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(note);
  } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
