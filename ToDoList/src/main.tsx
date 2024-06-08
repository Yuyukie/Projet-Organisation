import React from "react";
import ReactDOM from "react-dom/client";
import "../app/globals.css";
import Header from "./components/Header.tsx";
import Body from "./components/Body.tsx";

import { MyProvider } from "./components/Context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Header />
    <MyProvider>
      <Body />
    </MyProvider>
  </React.StrictMode>
);
