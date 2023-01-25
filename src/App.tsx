import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/userContext";
import React, { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.module.scss";

// components
import { Layout } from "./components/Layout/Layout";

// pages
import { CreatPost } from "./pages/CreatePost/CreatPost";
import { Register } from "./pages/Register/Register";
import { PostPage } from "./pages/PostPage/PostPage";
import { EditPost } from "./pages/EditPost/EditPost";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";

export const App = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_PORT}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((informations) => {
        setUserInfo(informations);
      });
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/create"
            element={
              userInfo?.nivel === "adm" ? <CreatPost /> : <Navigate to={"/"} />
            }
          />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
};
