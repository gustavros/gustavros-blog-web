import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import styles from "./header.module.scss";

export const Header = () => {
  const { userInfo, setUserInfo, username, setUsername } =
    useContext(UserContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_PORT}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((user) => {
        setUserInfo(user);
        setUsername(user.username);
      });
    });
  }, [userInfo?.username]);

  function logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    setUserInfo(null);
    setUsername("");

    window.location.href = "/";
  }

  return (
    <header>
      <Link to="/" className={styles.logo}>
        Gustavo's Blog
      </Link>

      <nav>
        {username && (
          <>
            {userInfo?.nivel === "adm" && (
              <Link to="/create">Create new post</Link>
            )}
            <a href="" onClick={logout} className={styles.logout}>
              Logout ({username})
            </a>
          </>
        )}

        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};
