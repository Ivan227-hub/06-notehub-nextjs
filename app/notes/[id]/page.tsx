import { notFound } from "next/navigation";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNotes, fetchNoteById } from "../../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface Props {
  params: { id: string };
}

export default async function NotePage({ params }: Props) {
  const queryClient = new QueryClient();

  // Предварительная загрузка списка заметок
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: ({ queryKey }) => {
      const [, page, search] = queryKey as [string, number, string]; // заменили key на _
      return fetchNotes(page, search);
    },
  });

  // Предварительная загрузка конкретной заметки
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
