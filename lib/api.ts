import axios from "axios";
import { Note, FetchNotesResponse } from "../types/note";

export type { FetchNotesResponse }; // <-- добавь это!

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (
  page: number = 1,
  search: string = ""
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: { page, search },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
