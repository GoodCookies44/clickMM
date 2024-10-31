// Модули
import React from "react";
import {createRoot} from "react-dom/client";
import {MemoryRouter} from "react-router-dom";
import Modal from "react-modal";
// Компоненты
import App from "./App";

// Устанавливаем основной элемент приложения
Modal.setAppElement("#root");

// Проверяем браузер и добавляем класс
const userAgent = navigator.userAgent.toLowerCase();

if (userAgent.includes("chrome") && !userAgent.includes("edg")) {
  document.body.classList.add("chrome-side-panel");
}

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </React.StrictMode>
);
