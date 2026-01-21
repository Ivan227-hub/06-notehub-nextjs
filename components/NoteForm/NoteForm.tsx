"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import { Note } from "../../types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: Note["tag"];
}

const schema = Yup.object({
  title: Yup.string().min(3).max(50).required("Required"),
  content: Yup.string().max(500),
  tag: Yup.mixed<FormValues["tag"]>().oneOf([
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
  ]),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  return (
    <Formik<FormValues>
      initialValues={{ title: "", content: "", tag: "Work" }}
      validationSchema={schema}
      onSubmit={values =>
        mutation.mutate({
          ...values,
          content: values.content || "",
        })
      }
    >
      <Form className={css.form}>
        <Field name="title" placeholder="Title" />
        <ErrorMessage name="title" component="span" />

        <Field as="textarea" name="content" placeholder="Content" />
        <ErrorMessage name="content" component="span" />

        <Field as="select" name="tag">
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </Field>
        <ErrorMessage name="tag" component="span" />

        <div className={css.actions}>
          <button type="submit">Create</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
}
