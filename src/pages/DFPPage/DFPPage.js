import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";
import ListItem from "../../components/ListItem/ListItem";
// Стили
import "./DFPPage.css";

export default function DFPPage() {
  return (
    <div>
      <section className="counter__section DFP">
        <div className="container__FP">
          Запросы
          <Counter id="DFP_request" />
        </div>
        <div className="bottom_container">
          <div className="container__FP ">
            Принято
            <Counter id="DFP_accepted" targetIds={["DFP_request"]} />
          </div>
          <div className="container__FP">
            Отклонено
            <Counter id="DFP_rejected" targetIds={["DFP_request"]} />
          </div>
        </div>
      </section>
      <section className="list__section">
        <p>Причины отказа:</p>
        <ul>
          <ListItem text={"Причина 1: Мало фотографий"} />
          <ListItem text={"Причина 2: Фото не студийное"} />
          <ListItem text={"Причина 3: На фото есть инфографика"} />
          <ListItem text={"Причина 4: Фото в карточке товара оформлено в виде коллажа"} />
          <ListItem text={"Причина 5: Плохое качество фото"} />
          <ListItem text={"Причина 6: Нарушено кадрирование фото"} />
          <ListItem text={"Причина 7: Нет достаточного размытия"} />
          <ListItem text={"Причина 8: Исходников нет или они не соответствуют требованиям"} />
          <ListItem text={"Причина 9: Нарушены требования к внешнему виду моделей"} />
          <ListItem text={"Причина 10: На фото есть лишний реквизит"} />
        </ul>
      </section>
    </div>
  );
}
