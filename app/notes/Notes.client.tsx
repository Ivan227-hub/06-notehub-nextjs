"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { fetchNotes, FetchNotesResponse } from "../../lib/api";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import SearchBox from "../../components/SearchBox/SearchBox";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";

import css from "./NotesPage.module.css";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  // ✅ useQuery с tuple и корректной типизацией
  const { data, isLoading, error } = useQuery<
    FetchNotesResponse,
    Error,
    FetchNotesResponse,
    readonly [string, number, string] // ключ tuple
  >(
    ["notes", page, debouncedSearch],
    fetchNotes,
    {
      keepPreviousData: true,
      placeholderData: { notes: [], totalPages: 0 },
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading notes</p>;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        <button onClick={() => setIsModalOpen(true)}>Create note</button>
      </div>

      {data.notes.length === 0 ? (
        <p>No notes found</p>
      ) : (
        <NoteList notes={data.notes} />
      )}

      <Pagination
        page={page}
        totalPages={data.totalPages}
        onPageChange={setPage}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
