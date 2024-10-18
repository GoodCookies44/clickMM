//Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";
import ResetCountersButton from "../../components/ResetCountersButton/ResetCountersButton";
// Стили

export default function PMPage() {
  return (
    <section className="counter__section FP">
      <ResetCountersButton
        counterIds={[
          "PM_order",
          "PM_filmed",
          "PM_p",
          "PM_m",
          "PM_infographic",
          "PM_ask",
          "PM_adjustment",
          "PM_unloading",
        ]}
      />
      <div className="counters__container">
        <div className="title_container">
          <h1>ПМ/БП</h1>
        </div>
        <div className="thematic__container">
          <div className="container__FP">
            Заказ товара
            <Counter id="PM_order" />
          </div>
          <div className="container__FP">
            Отснято
            <Counter id="PM_filmed" />
          </div>
          <div className="container__FP">
            Выгрузить П
            <Counter id="PM_p" />
          </div>
          <div className="container__FP">
            Выгрузить М
            <Counter id="PM_m" />
          </div>
        </div>

        <div className="thematic__container">
          <div className="container__FP">
            Инфографика
            <Counter id="PM_infographic" />
          </div>
          <div className="container__FP">
            Вопрос
            <Counter id="PM_ask" />
          </div>
          <div className="container__FP">
            Корректировка
            <Counter id="PM_adjustment" />
          </div>
          <div className="container__FP">
            Удалить
            <Counter id="PM_unloading" />
          </div>
        </div>
      </div>
    </section>
  );
}
