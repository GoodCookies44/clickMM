// Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";
import ResetCountersButton from "../../components/ResetCountersButton/ResetCountersButton";

export default function KPPage() {
  return (
    <div>
      <section className="counter__section">
        <ResetCountersButton counterIds={["KP_Trello", "KP_Adm"]} />
        <div className="counters__container">
          <div className="counter__container">
            Запросы в Trello:
            <Counter id="KP_Trello" />
          </div>
          <div className="counter__container">
            Запросы от КП (адм.):
            <Counter id="KP_Adm" />
          </div>
        </div>
      </section>
    </div>
  );
}
