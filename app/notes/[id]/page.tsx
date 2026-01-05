import { notFound } from "next/navigation";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface Props {
  params: { id: string };
}

export default async function NotePage({ params }: Props) {
  const queryClient = new QueryClient();

  // Флаг для проверки, существует ли заметка
  let noteExists = true;

  try {
    // Предварительно загружаем заметку в кеш
    await queryClient.prefetchQuery({
      queryKey: ["note", params.id],
      queryFn: () => fetchNoteById(params.id),
    });

    const note = queryClient.getQueryData(["note", params.id]);

    // Если заметка отсутствует — установим флаг
    if (!note) {
      noteExists = false;
    }
  } catch (error) {
    console.error("Ошибка при загрузке заметки:", error);
    // Если fetch упал — отдаём 404
    notFound();
  }

  // После try/catch рендерим JSX
  if (!noteExists) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Заметка не найдена</h2>
        <p>Проверьте правильность URL или выберите другую заметку.</p>
      </div>
    );
  }

  // Если заметка есть — рендерим клиентский компонент с гидратированным кешем
  return (
    <NoteDetailsClient
      id={params.id}
      dehydratedState={dehydrate(queryClient)}
    />
  );
}
