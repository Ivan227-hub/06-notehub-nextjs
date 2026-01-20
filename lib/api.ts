import axios from "axios";
import { Note } from "../types/note";
import { QueryFunctionContext } from "@tanstack/react-query";

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

export const fetchNotes = async ({
  queryKey,
}: QueryFunctionContext<readonly [string, number, string]>): Promise<FetchNotesResponse> => {
  const [, page, search] = queryKey; // ⬅️ key пропущен

  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: { page, search },
  });

  return data;
};
