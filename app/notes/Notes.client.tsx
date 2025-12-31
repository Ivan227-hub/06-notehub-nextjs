"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

export default function NotesClient() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", ""],
    queryFn: () => fetchNotes(""),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;

  return <NoteList notes={data ?? []} />;
}
