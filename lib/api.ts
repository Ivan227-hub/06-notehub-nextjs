import axios from "axios";
import { Note } from "../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

/* =======================
   GET: список заметок
======================= */
export const fetchNotes = async (
  page: number = 1,
  search: string = ""
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: { page, search },
  });

  return data;
};

/* =======================
   GET: заметка по ID
======================= */
export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

/* =======================
   POST: создать заметку
======================= */
export const createNote = async (
  note: Pick<Note, "title" | "content">
): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

/* =======================
   DELETE: удалить заметку
======================= */
export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
