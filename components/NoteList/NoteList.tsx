import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../lib/api";
import { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <span className={css.tag}>{note.tag}</span>

          <div>
            <Link href={`/notes/${note.id}`}>View</Link>
            <button onClick={() => mutation.mutate(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
