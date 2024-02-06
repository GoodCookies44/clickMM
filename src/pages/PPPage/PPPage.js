// Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";
// Стили
import "./PPPage.css";

export default function PPPage() {
  return (
    <div>
      <section className="counter__section">
        <Counter id="PP" initialValue={0} />
      </section>
    </div>
  );
}
