import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Предзагрузка заметок (page = 1, search = "")
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""], // обязательно передаем page и search
    queryFn: fetchNotes,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
