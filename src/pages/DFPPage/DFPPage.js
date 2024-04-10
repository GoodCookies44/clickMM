import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";
import ListItem from "../../components/ListItem/ListItem";
import ResetCountersButton from "../../components/ResetCountersButton/ResetCountersButton";
// Стили
import "./DFPPage.css";

export default function DFPPage() {
  return (
    <div>
      <section className="counter__section DFP">
        <ResetCountersButton counterIds={["DFP_request", "DFP_accepted", "DFP_rejected"]} />
        <div className="counters__container DFP">
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
        </div>
      </section>
      <section className="list__section FP">
        <p>Причины отказа:</p>
        <ul>
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
          <li>
            <ListItem
              text={
                "Запросы на добавление фото в заблокированные карточки не обрабатываются. Пожалуйста, ознакомьтесь с регламентом: https://t.me/c/1553068327/370"
              }
            />
          </li>
        </ul>
      </section>
    </div>
  );
}
