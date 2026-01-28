"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Note } from "@/types/note";
import css from "./NoteList.module.css";
import { deleteNoteById } from "@/lib/api";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNoteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note: Note) => (
        <li key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>
          <p className={css.tag}>{note.tag}</p>

          <Link className={css.link} href={`/notes/${note.id}`}>
            View details
          </Link>

          <button
            className={css.button}
            onClick={() => deleteMutation.mutate(note.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
