import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface NotePageProps {
  params: { id: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const queryClient = new QueryClient();

  // prefetch для SSR + гидратация кеша
  await queryClient.prefetchQuery({
  queryKey: ["note", params.id],
  queryFn: () => fetchNoteById(params.id),
});


  return (
    <NoteDetailsClient id={params.id} dehydratedState={dehydrate(queryClient)} />
  );
}
