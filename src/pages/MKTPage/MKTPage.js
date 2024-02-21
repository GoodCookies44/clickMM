// Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter.js";
// Стили
import "./MKTPage.css";

export default function MKTPage() {
  return (
    <>
      <section className="counter__section">
        <Counter id="MKT" />
      </section>
      <section className="list__section">
        <p>Причины блокировки МКТ:</p>
        <p>
          Отклонено: <Counter id="MKT_Sum" />
        </p>

        <ol>
          <li>
            Описание в карточке не соответствует товару:{" "}
            <Counter id="MKT1" targetIds={["MKT", "MKT_Sum"]} />
          </li>
          <li>
            Пересорт: <Counter id="MKT2" targetIds={["MKT", "MKT_Sum"]} />
          </li>
          <li>
            Запрещенный к продаже товар для самозанятых:{" "}
            <Counter id="MKT3" targetIds={["MKT", "MKT_Sum"]} />
          </li>
          <li>
            Запрещенный к продаже товар: <Counter id="MKT4" targetIds={["MKT", "MKT_Sum"]} />
          </li>
          <li>
            Использование карточки для другого товара:{" "}
            <Counter id="MKT5" targetIds={["MKT", "MKT_Sum"]} />
          </li>
          <li>
            По запросу правообладателя товарного знака:{" "}
            <Counter id="MKT6" targetIds={["MKT", "MKT_Sum"]} />
          </li>
          <li>
            Фотография в карточке не соответствует товару:{" "}
            <Counter id="MKT7" targetIds={["MKT", "MKT_Sum"]} />
          </li>
          <li>
            Изображение упаковки не соответствует фактической:{" "}
            <Counter id="MKT8" targetIds={["MKT", "MKT_Sum"]} />
          </li>
          <li>
            Использование фотографий другого продавца:{" "}
            <Counter id="MKT9" targetIds={["MKT", "MKT_Sum"]} />
          </li>
          <li>
            Подозрение на контрафакт: <Counter id="MKT10" targetIds={["MKT", "MKT_Sum"]} />
          </li>
          <li>
            По запросу контролирующих органов: <Counter id="MKT11" targetIds={["MKT", "MKT_Sum"]} />
          </li>
          <li>
            По запросу контролирующих органов ФАС:{" "}
            <Counter id="MKT12" targetIds={["MKT", "MKT_Sum"]} />
          </li>
        </ol>
      </section>
    </>
  );
}