import React from "react";
import ReactDOM from "react-dom/client";
import MainProvider from "./context/index.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainProvider />
  </React.StrictMode>
);
