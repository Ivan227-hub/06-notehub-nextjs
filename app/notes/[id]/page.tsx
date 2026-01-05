// page.tsx
import { notFound } from "next/navigation";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

export default async function NotePage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  try {
    const note = await fetchNoteById(params.id);
    if (!note?.id) notFound(); // вызываем только если нет заметки

    await queryClient.prefetchQuery({
      queryKey: ["note", params.id],
      queryFn: () => fetchNoteById(params.id),
    });
  } catch {
    notFound(); // если fetch упал (404)
  }

  return <NoteDetailsClient id={params.id} dehydratedState={dehydrate(queryClient)} />;
}
