// Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";
import ResetCountersButton from "../../components/ResetCountersButton/ResetCountersButton";

export default function PPPage() {
  return (
    <div>
      <section className="counter__section">
        <ResetCountersButton counterIds={["PP"]} />
        <div className="counters__container">
          <Counter id="PP" />
        </div>
      </section>
    </div>
  );
}
