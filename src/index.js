import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import {MemoryRouter} from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </React.StrictMode>
);
