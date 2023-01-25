import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "../../components/Post/Post";

import styles from "./home.module.scss";

interface AuthorProps {
  username: string;
  _id: string;
}

interface PostsProps {
  title: string;
  summary: string;
  cover: string;
  author: AuthorProps;
  content: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
}

export const Home = () => {
  const [posts, setPosts] = useState<PostsProps[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_PORT}/post`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      {posts.length >= 0 ? (
        posts.map((post) => {
          return <Post props={post} key={post._id} />;
        })
      ) : (
        <div className={styles.blank}>
          <h1>No post.</h1>
          <Link to="/create">Create now </Link>
        </div>
      )}
    </>
  );
};
