"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import css from "./NotesPage.module.css";
import { Note } from "@/types/note";

export default function NotesClient() {
  const { data, isLoading, error } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Could not fetch the list of notes.</p>;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <button className={css.button}>Create note</button>
      </div>

      <NoteList notes={data ?? []} />
    </div>
  );
}
