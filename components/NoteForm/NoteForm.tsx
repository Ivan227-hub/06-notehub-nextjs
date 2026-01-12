"use client";

import { FormEvent, useState } from "react";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onSubmit: (title: string, content: string) => void;
}

export default function NoteForm({ onSubmit }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    onSubmit(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        placeholder="Note title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        className={css.textarea}
        placeholder="Note content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button className={css.button} type="submit">
        Add note
      </button>
    </form>
  );
}
