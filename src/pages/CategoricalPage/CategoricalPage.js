//Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";
import ResetCountersButton from "../../components/ResetCountersButton/ResetCountersButton";
// Стили

export default function CategoricalPage() {
  return (
    <section className="counter__section FP">
      <ResetCountersButton
        counterIds={[
          "Cat_item",
          "Cat_model",
          "Cat_banner",
          "Cat_render",
          "Cat_ask",
          "Cat_unloading",
        ]}
      />
      <div className="counters__container">
        <div className="title_container">
          <h1>Категорийка</h1>
        </div>
        <div className="thematic__container">
          <div className="container__FP">
            Предметка
            <Counter id="Cat_item" />
          </div>
          <div className="container__FP">
            Моделька
            <Counter id="Cat_model" />
          </div>
        </div>

        <div className="thematic__container">
          <div className="container__FP">
            Баннер
            <Counter id="Cat_banner" />
          </div>
          <div className="container__FP">
            Рендер
            <Counter id="Cat_render" />
          </div>
        </div>

        <div className="thematic__container">
          <div className="container__FP">
            Вопрос
            <Counter id="Cat_ask" />
          </div>
          <div className="container__FP">
            Выгрузить
            <Counter id="Cat_unloading" />
          </div>
        </div>
      </div>
    </section>
  );
}
