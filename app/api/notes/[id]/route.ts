import { NextResponse, NextRequest } from "next/server";
// Используем относительные пути, чтобы точно сработало
import { fetchNoteById } from "../../../../lib/api";
import { Note } from "../../../../types/note";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const note: Note = await fetchNoteById(id);
    return NextResponse.json(note);
  } catch {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }
}
