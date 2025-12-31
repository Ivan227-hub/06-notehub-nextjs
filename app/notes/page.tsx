import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const client = new QueryClient();

  await client.prefetchQuery({
    queryKey: ["notes", ""],
    queryFn: () => fetchNotes(""),
  });

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
