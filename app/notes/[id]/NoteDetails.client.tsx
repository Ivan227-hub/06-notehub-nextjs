"use client";

import {
  useQuery,
  HydrationBoundary,
  type DehydratedState,
} from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import { Note } from "../../../types/note";
import css from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  id: string;
  dehydratedState: DehydratedState;
}

export default function NoteDetailsClient({
  id,
  dehydratedState,
}: NoteDetailsClientProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteContent id={id} />
    </HydrationBoundary>
  );
}

interface NoteContentProps {
  id: string;
}

function NoteContent({ id }: NoteContentProps) {
  const { data, isLoading, error } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return <p>Failed to load note</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <h2>{data.title}</h2>
        <p className={css.content}>{data.content}</p>
        <p className={css.tag}>{data.tag}</p>
        <p className={css.date}>
          Created: {data.createdAt}
        </p>
        <p className={css.date}>
          Updated: {data.updatedAt}
        </p>
      </div>
    </div>
  );
}
