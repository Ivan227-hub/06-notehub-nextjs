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
  },
});

// Получение списка заметок
export const fetchNotes = async (
  page: number = 1,
  search: string = ""
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: { page, search },
  });
  return data;
};

// Получение заметки по id
export const fetchNoteById = async (id: string) => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

// Создание заметки
export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}) => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

// Удаление заметки
export const deleteNote = async (id: string) => {
  await api.delete(`/notes/${id}`);
};
