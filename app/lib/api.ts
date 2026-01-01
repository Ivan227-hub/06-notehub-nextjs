import axios from "axios";
import { Note } from "@/types/note";
import { notFound } from "next/navigation";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (): Promise<Note[]> => {
  const { data } = await api.get("/notes");
  return data.notes;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const { data } = await api.get(`/notes/${id}`);
    if (!data.note) notFound();
    return data.note;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 404) notFound();
    throw err;
  }
};
