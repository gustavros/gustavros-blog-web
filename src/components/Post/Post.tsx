import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./post.module.scss";

interface AuthorProps {
  username: string;
  _id: string;
}

interface PostProps {
  props: {
    title: string;
    summary: string;
    cover: string;
    content: string;
    author: AuthorProps;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
  };
}

export const Post = ({ props }: PostProps) => {
  return (
    <>
      <div className={styles.post}>
        <div className={styles.img}>
          <Link to={`/post/${props._id}`}>
            <img src={`${import.meta.env.VITE_PORT}/${props.cover}`} alt="" />
          </Link>
        </div>

        <div className={styles.texts}>
          <Link to={`/post/${props._id}`}>
            <h2>{props.title}</h2>
          </Link>
          <p className={styles.info}>
            <a href="" className={styles.author}>
              {props.author?.username ?? "Unknow"}
            </a>
            <time>
              {format(new Date(props.createdAt), "MMM d, yyyy HH:mm")}
            </time>
          </p>
          <p className={styles.summary}>{props.summary}</p>
        </div>
      </div>
    </>
  );
};
