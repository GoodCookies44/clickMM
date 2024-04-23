// Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter.js";
import ResetCountersButton from "../../components/ResetCountersButton/ResetCountersButton.js";
// Стили
import "./MKTPage.css";

export default function MKTPage() {
  return (
    <>
      <section className="counter__section">
        <ResetCountersButton
          counterIds={[
            "MKT",
            "MKT_Sum",
            "MKT1",
            "MKT2",
            "MKT3",
            "MKT4",
            "MKT5",
            "MKT6",
            "MKT7",
            "MKT8",
            "MKT9",
            "MKT10",
            "MKT11",
            "MKT12",
          ]}
        />
        <div className="counters__container">
          <Counter id="MKT" />
        </div>
      </section>
      <section className="list__section">
        <p>Причины блокировки МКТ:</p>
        <p>
          Отклонено:
          <Counter
            id="MKT_Sum"
            targetIds={[
              "MKT1",
              "MKT2",
              "MKT3",
              "MKT4",
              "MKT5",
              "MKT6",
              "MKT7",
              "MKT8",
              "MKT9",
              "MKT10",
              "MKT11",
              "MKT12",
              "MKT13",
              "MKT14",
              "MKT15",
            ]}
            showSum={true}
          />
        </p>

        <ol>
          <li>
            Описание в карточке не соответствует товару:
            <Counter id="MKT1" targetIds={["MKT"]} />
          </li>
          <li>
            Пересорт:
            <Counter id="MKT2" targetIds={["MKT"]} />
          </li>
          <li>
            Фотография в карточке не соответствует товару:
            <Counter id="MKT3" targetIds={["MKT"]} />
          </li>
          <li>
            Подозрение на контрафакт:
            <Counter id="MKT4" targetIds={["MKT"]} />
          </li>
          <li>
            Отсутствие цензуры на контенте 18+:
            <Counter id="MKT5" targetIds={["MKT"]} />
          </li>
          <li>
            Запрещенный к продаже товар для самозанятых:
            <Counter id="MKT6" targetIds={["MKT"]} />
          </li>
          <li>
            Запрещенный к продаже товар:
            <Counter id="MKT7" targetIds={["MKT"]} />
          </li>
          <li>
            Изначально в карточке продавался другой товар:
            <Counter id="MKT8" targetIds={["MKT"]} />
          </li>
          <li>
            По запросу правообладателя товарного знака:
            <Counter id="MKT9" targetIds={["MKT"]} />
          </li>
          <li>
            Изображение упаковки не соответствует фактической:
            <Counter id="MKT10" targetIds={["MKT"]} />
          </li>
          <li>
            Использование фотографий другого продавца:
            <Counter id="MKT11" targetIds={["MKT"]} />
          </li>
          <li>
            По запросу контролирующих органов:
            <Counter id="MKT12" targetIds={["MKT"]} />
          </li>
          <li>
            По запросу контролирующих органов ФАС:
            <Counter id="MKT13" targetIds={["MKT"]} />
          </li>
          <li>
            Нарушена маркировка в системе «Честный знак». Не переданы QR коды в ЭДО:
            <Counter id="MKT14" targetIds={["MKT"]} />
          </li>
          <li>
            Искусственно завышенная цена:
            <Counter id="MKT15" />
          </li>
        </ol>
      </section>
    </>
  );
}
