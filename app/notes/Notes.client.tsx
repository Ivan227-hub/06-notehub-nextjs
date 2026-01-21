"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

export default function NotesClient() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes(1, ""),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !data) return <p>Could not fetch the list of notes.</p>;

  return <NoteList notes={data.notes} />;
}
