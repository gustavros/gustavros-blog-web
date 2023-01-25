import ReactQuill from "react-quill";
import React, { FormEvent, useState } from "react";

import "react-quill/dist/quill.snow.css";
import styles from "./createpost.module.scss";
import { Navigate } from "react-router-dom";
import { Editor } from "../../components/Editor/Editor";

export const CreatPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File | undefined>();

  const [redirect, setRedirect] = useState(false);

  async function createNewPost(event: FormEvent) {
    const data = new FormData();

    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (files) data.set("file", files);

    event.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_PORT}/post`, {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={createNewPost} className={styles.form}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(event) => {
          setSummary(event.target.value);
        }}
      />
      <input
        type="file"
        onChange={(event) => setFiles(event.target.files?.[0])}
      />

      <Editor onChange={setContent} value={content} />

      <button className={styles.create}>Create post</button>
    </form>
  );
};
