//Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";
import ResetCountersButton from "../../components/ResetCountersButton/ResetCountersButton";
// Стили

export default function PaidPage() {
  return (
    <section className="counter__section FP">
      <ResetCountersButton
        counterIds={[
          "Paid_item",
          "Paid_model",
          "Paid_retouch",
          "Paid_render",
          "Paid_ask",
          "Paid_unloading",
        ]}
      />
      <div className="counters__container">
        <div className="title_container">
          <h1>Платная съёмка</h1>
        </div>
        <div className="thematic__container">
          <div className="container__FP">
            Предметка
            <Counter id="Paid_item" />
          </div>
          <div className="container__FP">
            Моделька
            <Counter id="Paid_model" />
          </div>
        </div>

        <div className="thematic__container">
          <div className="container__FP">
            Ретушь
            <Counter id="Paid_retouch" />
          </div>
          <div className="container__FP">
            Рендер
            <Counter id="Paid_render" />
          </div>
        </div>

        <div className="thematic__container">
          <div className="container__FP">
            Вопрос
            <Counter id="Paid_ask" />
          </div>
          <div className="container__FP">
            Выгрузить
            <Counter id="Paid_unloading" />
          </div>
        </div>
      </div>
    </section>
  );
}
