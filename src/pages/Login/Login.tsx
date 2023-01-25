import { UserContext } from "../../context/userContext";
import { FormEvent, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "./login.module.scss";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setUserInfo } = useContext(UserContext);

  async function login(event: FormEvent) {
    event.preventDefault();

    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_PORT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    });
    setLoading(false);

    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);

        toast.success("Logged in");
      });
    } else {
      toast.error("Wrong credentials");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.login} onSubmit={login}>
      <div>
        <h1>Login</h1>
        <p>Log in to be able to use the Gustavo's Blog!</p>
      </div>

      <div className={styles.inputs__container}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="name"
          placeholder="eg.: João Silva"
          id="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </div>
      <div className={styles.inputs__container}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Your password here..."
          id="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      {loading ? <button disabled>Logging...</button> : <button>Login</button>}
    </form>
  );
};
