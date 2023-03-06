import styles from "./register.module.scss";
import { FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function register(event: FormEvent) {
    event.preventDefault();

    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_PORT}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    setLoading(false);

    if (response.status === 200) {
      toast.success("Registation successful");

      <Navigate to="/login" />;
    } else {
      toast.error("Register failed");
    }
  }

  return (
    <form className={styles.register} onSubmit={register}>
      <div>
        <h1>Register</h1>
        <p>Create your user and share your stories!</p>
      </div>

      <div className={styles.inputs__container}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="name"
          placeholder="Your username here..."
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className={styles.inputs__container}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Your password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {loading ? (
        <button disabled>Registering...</button>
      ) : (
        <button>Register</button>
      )}

      <div className={styles.info}>
        Dont' have an account? <Link to="/login">create now</Link>
      </div>
    </form>
  );
};
