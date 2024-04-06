// Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";
import ListItem from "../../components/ListItem/ListItem";
import ResetCountersButton from "../../components/ResetCountersButton/ResetCountersButton";
// Стили
import "./UMFPage.css";

export default function UMFPage() {
  return (
    <div>
      <section className="counter__section FP">
        <ResetCountersButton
          counterIds={["UMF_request", "UMF_SHK", "UMF_accepted", "UMF_rejected"]}
        />
        <div className="counters__container">
          <div className="container__FP">
            Запросы
            <Counter id="UMF_request" />
          </div>
          <div className="container__FP">
            ШК
            <Counter id="UMF_SHK" />
          </div>
          <div className="container__FP">
            Принято
            <Counter id="UMF_accepted" targetIds={["UMF_SHK"]} />
          </div>
          <div className="container__FP">
            Отклонено
            <Counter id="UMF_rejected" targetIds={["UMF_SHK"]} />
          </div>
        </div>
      </section>

      <section className="list__section FP">
        <p>Причины отказа:</p>
        <ul>
          <li>
            <ListItem text={"Причина 1: Фотографии не соответствуют техническим требованиям"} />
          </li>
          <li>
            <ListItem text={"Причина 2: Исходников нет, или они не соответствуют требованиям"} />
          </li>
          <li>
            <ListItem text={"Причина 3: Фотографии не отражают реальный вид товара"} />
          </li>
          <li>
            <ListItem text={"Причина 4: Фотографии не качественные"} />
          </li>
          <li>
            <ListItem
              text={"Причина 5: На фотографиях имеется запрещенная символика или информация "}
            />
          </li>
          <li>
            <ListItem text={"Причина 6: Отсутствие размытия на товарах 18+ "} />
          </li>
          <li>
            <ListItem text={"Причина 7: На фото товара имеется информация рекламного характера"} />
          </li>
          <li>
            <ListItem text={"Причина 8: Товары в запросе из других категорий"} />
          </li>
          <li>
            <ListItem
              text={
                "Причина 9: Неверно заполнена форма запроса или превышен лимит количества ШК на проверку в одном запросе (20 - по блоку №1, 1 по блоку №2)"
              }
            />
          </li>
          <li>
            <ListItem text={"Причина 10: Иные причины"} />
          </li>
        </ul>
      </section>
    </div>
  );
}
