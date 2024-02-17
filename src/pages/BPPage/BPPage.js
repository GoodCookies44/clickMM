// Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";

export default function BPPage() {
  return (
    <div>
      <section className="counter__section">
        <div className="counter__container">
          Запросы в Trello, Бизнес:
          <Counter id="BP_Business" />
        </div>
        <div className="counter__container">
          Запросы в Trello, ОКК:
          <Counter id="KP_OKK" />
        </div>
      </section>
    </div>
  );
}
