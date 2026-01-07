import { notFound } from "next/navigation";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface Props {
  params: { id: string };
}

export default async function NotePage({ params }: Props) {
  const queryClient = new QueryClient();

  
  let noteExists = true;

  try {
    
    await queryClient.prefetchQuery({
      queryKey: ["note", params.id],
      queryFn: () => fetchNoteById(params.id),
    });

    const note = queryClient.getQueryData(["note", params.id]);

    
    if (!note) {
      noteExists = false;
    }
  } catch (error) {
    console.error("Ошибка при загрузке заметки:", error);
    
    notFound();
  }

  
  if (!noteExists) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Заметка не найдена</h2>
        <p>Проверьте правильность URL или выберите другую заметку.</p>
      </div>
    );
  }

  
  return (
    <NoteDetailsClient
      id={params.id}
      dehydratedState={dehydrate(queryClient)}
    />
  );
}
