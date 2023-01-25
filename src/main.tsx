import UserContextProvider from "./context/userContext";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import React from "react";

import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserContextProvider>
);
