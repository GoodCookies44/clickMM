// Модули
import React, {useState} from "react";
// Компоненты
// Стили
import "./SheetPage.css";

export default function SheetPage() {
  const [TableUrl, setTableUrl] = useState("");

  // Функция для обновления URL в состоянии
  const handleInputChange = (event) => {
    setTableUrl(event.target.value);
  };

  return (
    <section className="sheet__container">
      <input
        className="sheet__input"
        type="text"
        placeholder="Вставьте URL"
        value={TableUrl}
        onChange={handleInputChange}
      />

      {TableUrl && <iframe className="sheet__iframe" src={TableUrl} title="Google Sheet"></iframe>}
    </section>
  );
}
