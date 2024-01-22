import React from "react";
import createRoot from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

createRoot.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
