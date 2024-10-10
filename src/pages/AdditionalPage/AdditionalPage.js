//Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";
import ResetCountersButton from "../../components/ResetCountersButton/ResetCountersButton";
// Стили

export default function AdditionalPage() {
  return (
    <section className="counter__section FP">
      <ResetCountersButton
        counterIds={[
          "Additional_completed",
          "Additional_tz",
          "Additional_coordination",
          "Additional_clarification",
        ]}
      />
      <div className="counters__container">
        <div className="title_container">
          <h1>Доп. услуги</h1>
        </div>
        <div className="thematic__container">
          <div className="container__FP">
            Завершено
            <Counter id="Additional_completed" />
          </div>
          <div className="container__FP">
            Отправлено ТЗ
            <Counter id="Additional_tz" />
          </div>
          <div className="container__FP">
            На согласовании
            <Counter id="Additional_coordination" />
          </div>
          <div className="container__FP">
            На уточнении
            <Counter id="Additional_clarification" />
          </div>
          <div className="container__FP">
            Пришло сегодня
            <Counter id="Additional_came" />
          </div>
        </div>
      </div>
    </section>
  );
}
