import { notFound } from "next/navigation";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNotes, fetchNoteById, FetchNotesResponse } from "../../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface Props {
  params: { id: string };
}

export default async function NotePage({ params }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: ({ queryKey }) => {
      const [_key, page, search] = queryKey as [string, number, string];
      return fetchNotes(page, search);
    },
  });

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", params.id],
      queryFn: () => fetchNoteById(params.id),
    });
  } catch {
    notFound();
  }

  return (
    <NoteDetailsClient
      id={params.id}
      dehydratedState={dehydrate(queryClient)}
    />
  );
}
