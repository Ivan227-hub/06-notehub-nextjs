"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import css from "./NoteForm.module.css";

interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

interface NoteFormProps {
  onClose: () => void;
}

const schema = Yup.object({
  title: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
  tag: Yup.string().required("Required"),
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
    <Formik<NoteFormValues>
      initialValues={{ title: "", content: "", tag: "work" }}
      validationSchema={schema}
      onSubmit={(values: NoteFormValues) => mutation.mutate(values)}
    >
      <Form className={css.form}>
        <Field name="title" placeholder="Title" />
        <ErrorMessage name="title" component="span" />

        <Field as="textarea" name="content" placeholder="Content" />
        <ErrorMessage name="content" component="span" />

        <Field as="select" name="tag">
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="other">Other</option>
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
