// Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";
import ListItem from "../../components/ListItem/ListItem";
// Стили
import "./MFPPage.css";

export default function MFPPage() {
  // Копирование текста в буфер обмена
  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <section className="counter__section">
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
          <Counter id="MFP_accepted" targetId="MFP_SHK" />
        </div>
        <div className="container__FP">
          Отклонено
          <Counter id="MFP_rejected" targetId="MFP_SHK" />
        </div>
        <div className="container__FP">
          На доработку
          <Counter id="MFP_revision" targetId="MFP_SHK" />
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
          <ListItem text={"Уже стоит отметка о студийных фотографиях"} />
        </ul>
      </section>
    </div>
  );
}
