import React, { FormEvent, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Editor } from "../../components/Editor/Editor";

import styles from "./editpost.module.scss";

export const EditPost = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File | undefined>();
  const [cover, setCover] = useState("");

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_PORT}/post/${id}`).then((response) => {
      response.json().then((postInformation) => {
        setTitle(postInformation.title);
        setContent(postInformation.content);
        setSummary(postInformation.summary);
      });
    });
  }, []);

  async function updatePost(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();

    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id!);

    if (files) data.set("file", files);

    const response = await fetch(`${import.meta.env.VITE_PORT}/post`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form onSubmit={updatePost} className={styles.form}>
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
      <Editor value={content} onChange={setContent} />

      <button className={styles.edit}>Update post</button>
    </form>
  );
};
