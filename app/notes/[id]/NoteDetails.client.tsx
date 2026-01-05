"use client";

import {
  useQuery,
  HydrationBoundary,
  type DehydratedState,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

interface Props {
  id: string;
  dehydratedState: DehydratedState;
}

export default function NoteDetailsClient({ id, dehydratedState }: Props) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteContent id={id} />
    </HydrationBoundary>
  );
}

function NoteContent({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Failed to load note</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <h2>{data.title}</h2>
        <p className={css.content}>{data.content}</p>
        <p className={css.date}>{data.createdAt}</p>
      </div>
    </div>
  );
}
