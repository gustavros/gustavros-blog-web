import { formatISO9075 } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import styles from "./postpage.module.scss";

interface AuthorProps {
  username: string;
  _id: string;
}

interface PostPageProps {
  title: string;
  summary: string;
  cover: string;
  content: string;
  author: AuthorProps;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
}

export const PostPage = () => {
  const { id } = useParams();

  const [postInformation, setPostInformation] = useState<PostPageProps>();
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_PORT}/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInformation(postInfo);
      });
    });
  }, []);

  if (!postInformation) return <div>Loading...</div>;

  return (
    <>
      <div className={styles.container}>
        <h1>{postInformation.title}</h1>
        <time>{formatISO9075(new Date(postInformation.createdAt))}</time>
        <div className={styles.author}>
          by{" "}
          {postInformation.author?.username
            ? postInformation.author?.username
            : "Unknow"}
        </div>
        {userInfo?.nivel === "adm" && (
          <div className={styles.edit__row}>
            <Link to={`/edit/${postInformation._id}`}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Edit this post
            </Link>
          </div>
        )}
        <div className={styles.image}>
          <img
            src={`${import.meta.env.VITE_PORT}/${postInformation.cover}`}
            alt={postInformation.summary}
          />
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: postInformation.content }}
        ></div>
      </div>
    </>
  );
};
