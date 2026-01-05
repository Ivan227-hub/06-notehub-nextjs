import { notFound } from "next/navigation";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface Props {
  params: { id: string };
}

export default async function NotePage({ params }: Props) {
  const queryClient = new QueryClient();

  try {
    // prefetch заметки в кеш
    await queryClient.prefetchQuery({
      queryKey: ["note", params.id],
      queryFn: () => fetchNoteById(params.id),
    });

    // проверка, есть ли заметка в кеше
    const note = queryClient.getQueryData(["note", params.id]);
    if (!note) notFound(); // если нет — 404
  } catch {
    notFound(); // если fetch упал
  }

  return <NoteDetailsClient id={params.id} dehydratedState={dehydrate(queryClient)} />;
}
