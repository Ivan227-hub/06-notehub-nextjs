// app/api/notes/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { notes, Note } from "../../../lib/api"; // <-- используем api.ts, а не data.ts

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const note = notes.find((n: Note) => n.id === parseInt(params.id));
  if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(note);
}
