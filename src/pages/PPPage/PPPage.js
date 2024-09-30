// Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";
import ResetCountersButton from "../../components/ResetCountersButton/ResetCountersButton";
// Стили
import "./PPPage.css";

export default function PPPage() {
  return (
    <div>
      <section className="counter__section">
        <ResetCountersButton counterIds={["PP", "PP_rejected"]} />
        <div className="counters__container PP">
          Принято
          <Counter id="PP" />
        </div>
        <div className="counters__container PP">
          Отклонено
          <Counter id="PP_rejected" />
        </div>
      </section>
    </div>
  );
}
