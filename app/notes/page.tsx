import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Предзагрузка заметок (page = 1, search = "")
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""], // page и search
    queryFn: ({ queryKey }) => {
      const [, page = 1, search = ""] = queryKey as [string, number, string];
      return fetchNotes(page, search);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
