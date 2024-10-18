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
        counterIds={["Paid_order", "Paid_filmed", "Paid_p", "Paid_m", "Paid_render"]}
      />
      <div className="counters__container">
        <div className="title_container">
          <h1>Платная съёмка</h1>
        </div>

        <div className="thematic__container">
          <div className="container__FP">
            Заказ товара
            <Counter id="Paid_order" />
          </div>
          <div className="container__FP">
            Отснято
            <Counter id="Paid_filmed" />
          </div>
        </div>

        <div className="thematic__container">
          <div className="container__FP">
            Выгрузить П
            <Counter id="Paid_p" />
          </div>
          <div className="container__FP">
            Выгрузить М
            <Counter id="Paid_m" />
          </div>
          <div className="container__FP">
            Рендер
            <Counter id="Paid_render" />
          </div>
        </div>
      </div>
    </section>
  );
}
