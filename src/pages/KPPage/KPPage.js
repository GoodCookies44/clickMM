// Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";

export default function KPPage() {
  return (
    <div>
      <section className="counter__section">
        <div className="counter__container">
          Запросы в Trello:
          <Counter id="KP_Trello" />
        </div>
        <div className="counter__container">
          Запросы от КП (адм.):
          <Counter id="KP_Adm" />
        </div>
      </section>
    </div>
  );
}
