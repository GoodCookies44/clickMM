// Модули
import React from "react";
import {createRoot} from "react-dom/client";
import {MemoryRouter} from "react-router-dom";
// Компоненты
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </React.StrictMode>
);
