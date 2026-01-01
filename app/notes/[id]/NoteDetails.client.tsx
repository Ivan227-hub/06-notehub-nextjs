"use client";

import { useQuery, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";
import { Note } from "@/types/note";

import type { DehydratedState } from "@tanstack/react-query";

interface NoteDetailsClientProps {
  id: string;
  dehydratedState: DehydratedState; // правильно
}


export default function NoteDetailsClient({
  id,
  dehydratedState,
}: NoteDetailsClientProps) {
  const { data, isLoading, error } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>{data.createdAt}</p>
        </div>
      </div>
    </HydrationBoundary>
  );
}
