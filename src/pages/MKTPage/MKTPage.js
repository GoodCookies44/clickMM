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
        <Counter id="MKT" initialValue={0} />
      </section>
      <section className="list__section">
        <p>Причины блокировки МКТ:</p>
        <ol>
          <li>
            Описание в карточке не соответствует товару: <Counter id="MKT1" initialValue={0} />
          </li>
          <li>
            Пересорт: <Counter id="MKT2" initialValue={0} />
          </li>
          <li>
            Запрещенный к продаже товар для самозанятых: <Counter id="MKT3" initialValue={0} />
          </li>
          <li>
            Запрещенный к продаже товар: <Counter id="MKT4" initialValue={0} />
          </li>
          <li>
            Использование карточки для другого товара: <Counter id="MKT5" initialValue={0} />
          </li>
          <li>
            По запросу правообладателя товарного знака: <Counter id="MKT6" initialValue={0} />
          </li>
          <li>
            Фотография в карточке не соответствует товару: <Counter id="MKT7" initialValue={0} />
          </li>
          <li>
            Изображение упаковки не соответствует фактической:{" "}
            <Counter id="MKT8" initialValue={0} />
          </li>
          <li>
            Использование фотографий другого продавца: <Counter id="MKT9" initialValue={0} />
          </li>
          <li>
            Подозрение на контрафакт: <Counter id="MKT10" initialValue={0} />
          </li>
          <li>
            По запросу контролирующих органов: <Counter id="MKT11" initialValue={0} />
          </li>
          <li>
            По запросу контролирующих органов ФАС: <Counter id="MKT12" initialValue={0} />
          </li>
        </ol>
      </section>
    </>
  );
}
