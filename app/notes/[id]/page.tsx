import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import css from "./NoteDetailsPage.module.css";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function NotePage({ params }: Props) {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", params.id],
      queryFn: () => fetchNoteById(params.id),
    });
  } catch {
    notFound();
  }

  return (
    <div className={css.container}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient id={params.id} />
      </HydrationBoundary>
    </div>
  );
}
