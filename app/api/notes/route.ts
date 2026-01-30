import { NextResponse } from "next/server";
import { fetchNotes } from "@/lib/api";

export async function GET() {
  try {
    const notes = await fetchNotes();
    return NextResponse.json(notes);
  } catch {
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
  }
}
