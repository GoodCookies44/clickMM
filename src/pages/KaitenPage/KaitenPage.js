//Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";
import ResetCountersButton from "../../components/ResetCountersButton/ResetCountersButton";
// Стили

export default function KaitenPage() {
  return (
    <section className="counter__section FP">
      <ResetCountersButton
        counterIds={["BP_Business", "BP_OKK", "BP_Kont", "KP_Trello", "KP_Adm"]}
      />
      <div className="counters__container">
        <div className="container__FP">
          КП(адм.)
          <Counter id="KP_Adm" />
        </div>
        <div className="container__FP">
          Kaiten, КП
          <Counter id="KP_Trello" />
        </div>
        <div className="container__FP">
          Kaiten, Бизнес
          <Counter id="BP_Business" />
        </div>
        <div className="container__FP">
          Kaiten, ОКК
          <Counter id="BP_OKK" />
        </div>
        <div className="container__FP">
          Контрафакт
          <Counter id="BP_Kont" />
        </div>
      </div>
    </section>
  );
}
