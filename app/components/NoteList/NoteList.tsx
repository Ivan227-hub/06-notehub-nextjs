import Link from "next/link";
import { Note } from "@/types/note";
import css from "./NoteList.module.css";

type Props = {
  notes: Note[];
};

export default function NoteList({ notes }: Props) {
  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.item}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <Link href={`/notes/${note.id}`}>View details</Link>
        </li>
      ))}
    </ul>
  );
}
