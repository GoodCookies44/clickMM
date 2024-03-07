// Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";
import ListItem from "../../components/ListItem/ListItem";
import ResetCountersButton from "../../components/ResetCountersButton/ResetCountersButton";
// Стили
import "./MFPPage.css";

export default function MFPPage() {
  return (
    <div>
      <section className="counter__section FP">
        <ResetCountersButton
          counterIds={["MFP_request", "MFP_SHK", "MFP_accepted", "MFP_rejected", "MFP_revision"]}
        />
        <div className="counters__container">
          <div className="container__FP">
            Запросы
            <Counter id="MFP_request" />
          </div>
          <div className="container__FP">
            ШК
            <Counter id="MFP_SHK" />
          </div>
          <div className="container__FP">
            Принято
            <Counter id="MFP_accepted" targetIds={["MFP_SHK"]} />
          </div>
          <div className="container__FP">
            Отклонено
            <Counter id="MFP_rejected" targetIds={["MFP_SHK"]} />
          </div>
          <div className="container__FP">
            На доработку
            <Counter id="MFP_revision" targetIds={["MFP_SHK"]} />
          </div>
        </div>
      </section>
      <section className="list__section FP">
        <p>Причины отказа:</p>
        <ul>
          <li>
            <ListItem text={"Уже стоит отметка о студийных фотографиях"} />
          </li>
          <li>
            <ListItem text={"Причина 1: Мало фотографий"} />
          </li>
          <li>
            <ListItem text={"Причина 2: Фото не студийное"} />
          </li>
          <li>
            <ListItem text={"Причина 3: На фото есть инфографика"} />
          </li>
          <li>
            <ListItem text={"Причина 4: Фото в карточке товара оформлено в виде коллажа"} />
          </li>
          <li>
            <ListItem text={"Причина 5: Плохое качество фото"} />
          </li>
          <li>
            <ListItem text={"Причина 6: Нарушено кадрирование фото"} />
          </li>
          <li>
            <ListItem text={"Причина 7: Нет достаточного размытия"} />
          </li>
          <li>
            <ListItem text={"Причина 8: Исходников нет или они не соответствуют требованиям"} />
          </li>
          <li>
            <ListItem text={"Причина 9: Нарушены требования к внешнему виду моделей"} />
          </li>
          <li>
            <ListItem text={"Причина 10: На фото есть лишний реквизит"} />
          </li>
        </ul>
      </section>
    </div>
  );
}
