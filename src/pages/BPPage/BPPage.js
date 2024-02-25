// Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";
import ResetCountersButton from "../../components/ResetCountersButton/ResetCountersButton";

export default function BPPage() {
  return (
    <div>
      <section className="counter__section">
        <ResetCountersButton counterIds={["BP_Business", "BP_OKK", "BP_Kont"]} />
        <div className="counters__container">
          <div className="counter__container">
            Запросы в Trello, Бизнес:
            <Counter id="BP_Business" />
          </div>
          <div className="counter__container">
            Запросы в Trello, ОКК:
            <Counter id="BP_OKK" />
          </div>
          <div className="counter__container">
            Контрафакт:
            <Counter id="BP_Kont" />
          </div>
        </div>
      </section>
    </div>
  );
}
