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
          "PM_item",
          "PM_model",
          "PM_retouch",
          "PM_infographic",
          "PM_ask",
          "PM_unloading",
        ]}
      />
      <div className="counters__container">
        <div className="title_container">
          <h1>ПМ/БП</h1>
        </div>
        <div className="thematic__container">
          <div className="container__FP">
            Предметка
            <Counter id="PM_item" />
          </div>
          <div className="container__FP">
            Моделька
            <Counter id="PM_model" />
          </div>
        </div>

        <div className="thematic__container">
          <div className="container__FP">
            Ретушь
            <Counter id="PM_retouch" />
          </div>
          <div className="container__FP">
            Инфографика
            <Counter id="PM_infographic" />
          </div>
        </div>

        <div className="thematic__container">
          <div className="container__FP">
            Вопрос
            <Counter id="PM_ask" />
          </div>
          <div className="container__FP">
            Выгрузить/удалить
            <Counter id="PM_unloading" />
          </div>
          <div className="container__FP">
            Корректировка
            <Counter id="PM_adjustment" />
          </div>
        </div>
      </div>
    </section>
  );
}
