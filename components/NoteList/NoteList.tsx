import Link from "next/link";
import { Note } from "@/types/note";

interface Props {
  notes: Note[];
}

export default function NoteList({ notes }: Props) {
  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <Link href={`/notes/${note.id}`}>View details</Link>
        </li>
      ))}
    </ul>
  );
}
