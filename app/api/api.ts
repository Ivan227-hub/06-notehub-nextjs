import axios from "axios";
import { Note } from "@/types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});


export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}


export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: Note["tag"];
}


export const fetchNotes = async (
  page: number = 1,
  search: string = ""
): Promise<FetchNotesResponse> => {
  const res = await api.get<FetchNotesResponse>(
    `/notes?page=${page}&search=${search}`
  );
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};


export const createNote = async (
  note: CreateNoteRequest
): Promise<Note> => {
  const res = await api.post<Note>("/notes", note);
  return res.data;
};


export const deleteNoteById = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};