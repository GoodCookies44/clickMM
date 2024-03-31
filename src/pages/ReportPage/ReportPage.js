// Модули
import React, {useContext, useEffect, useState} from "react";
import {CounterContext} from "../../components/Context/CounterContext";
//Стили
import "./ReportPage.css";

export default function ReportPage() {
  const {counters} = useContext(CounterContext); // Подставьте ваш контекст с данными
  const [name, setName] = useState(localStorage.getItem("username") || "");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [report, setReport] = useState("");
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    setIsNameEntered(name.trim() !== "");
  }, [name]);

  useEffect(() => {
    localStorage.setItem("username", name);
  }, [name]);

  const handleNameChange = (event) => {
    const enteredName = event.target.value;
    setName(enteredName);
    setIsNameEntered(enteredName.trim() !== ""); // Устанавливаем флаг isNameEntered, если введено имя
  };

  const generateReport = () => {
    if (!name.trim()) {
      return;
    }

    let reportText = `#отчет${name} ${currentDate}\n`;

    const groups = {
      mkt_group: [
        {text: "**Модерация карточек товара:**", id: "MKT"},
        {text: "Отклонено:", id: "MKT_Sum", addEmptyLineAfter: true},
        {text: "Описание в карточке не соответствует товару:", id: "MKT1"},
        {text: "Пересорт:", id: "MKT2"},
        {text: "Фотография в карточке не соответствует товару:", id: "MKT3"},
        {text: "Подозрение на контрафакт:", id: "MKT4"},
        {text: "Отсутствие цензуры на контенте 18+:", id: "MKT5"},
        {text: "Запрещенный к продаже товар для самозанятых:", id: "MKT6"},
        {text: "Запрещенный к продаже товар:", id: "MKT7"},
        {text: "Изначально в карточке продавался другой товар:", id: "MKT8"},
        {text: "По запросу правообладателя товарного знака:", id: "MKT9"},
        {text: "Изображение упаковки не соответствует фактической:", id: "MKT10"},
        {text: "Использование фотографий другого продавца:", id: "MKT11"},
        {text: "По запросу контролирующих органов:", id: "MKT12"},
        {text: "По запросу контролирующих органов ФАС:", id: "MKT13"},
        {
          text: " Нарушена маркировка в системе «Честный знак». Не переданы QR коды в ЭДО:",
          id: "MKT14",
        },
      ],
      pp_group: [{text: "**Модерация платного продвижения:**", id: "PP", addEmptyLineBefore: true}],
      mfp_group: [
        {text: "**Модерация фото продавцов:**", id: ""},
        {text: "Проверено запросов:", id: "MFP_request"},
        {text: "Проверено ШК:", id: "MFP_SHK"},
        {text: "Из них принято:", id: "MFP_accepted"},
        {text: "Отклонено:", id: "MFP_rejected"},
        {text: "На доработку:", id: "MFP_revision"},
      ],
      umf_group: [
        {text: "**Упрощённая модерация фото:**", id: ""},
        {text: "Проверено запросов:", id: "UMF_request"},
        {text: "Проверено ШК:", id: "UMF_SHK"},
        {text: "Из них принято:", id: "UMF_accepted"},
        {text: "Отклонено:", id: "UMF_rejected"},
      ],
      dfp_group: [
        {
          text: "**Обработано запросов на добавление фото продавца:**",
          id: "DFP_request",
          addEmptyLineBefore: true,
        },
        {text: "Принято:", id: "DFP_accepted"},
        {text: "Отклонено:", id: "DFP_rejected"},
      ],
      kp_group: [
        {text: "**Обработано запросов в Trello, КП:**", id: "KP_Trello", addEmptyLineBefore: true},
        {text: "**Обработано запросов от КП (адм.):**", id: "KP_Adm"},
      ],
      bp_group: [
        {
          text: "**Обработано запросов в Trello, Бизнес:**",
          id: "BP_Business",
          addEmptyLineBefore: true,
        },
        {text: "**Обработано запросов в Trello, ОКК:**", id: "BP_OKK"},
        {
          text: "**Проверены контрафактные товары, текстовые разделы товаров изменены**",
          id: "BP_Kont",
        },
      ],
    };

    // Проходимся по каждой группе
    Object.keys(groups).forEach((groupKey) => {
      const group = groups[groupKey];

      // Для группы mkt_group отображаем только ненулевые значения
      if (groupKey === "mkt_group") {
        group.forEach((item) => {
          const counter = counters.find((counter) => counter.id === item.id);
          if (counter && counter.value !== 0) {
            reportText += `\n${item.text} ${counter.value}`; // Добавить значение счетчика в отчет
            if (item.addEmptyLineAfter) {
              reportText += "\n";
            }
          }
        });
      } else {
        // Проверяем, есть ли хотя бы одно ненулевое значение в группе
        const hasNonZeroValue = group.some((item) => {
          const counter = counters.find((counter) => counter.id === item.id);
          return counter && counter.value !== 0;
        });

        // Если есть хотя бы одно ненулевое значение, отображаем все значения группы
        if (hasNonZeroValue) {
          // Для группы mfp_group добавляем строку "Модерация фото продавцов"
          if (groupKey === "mfp_group") {
            reportText += "\n**Модерация фото продавцов:**\n";
          }
          // Для группы umf_group добавляем строку "Модерация фото продавцов"
          if (groupKey === "umf_group") {
            reportText += "\n**Упрощённая модерация фото:**\n";
          }

          group.forEach((item) => {
            const counter = counters.find((counter) => counter.id === item.id);
            if (counter) {
              if (item.addEmptyLineBefore) {
                reportText += "\n";
              }
              reportText += `${item.text} ${counter.value}\n`; // Добавить значение счетчика в отчет
            }
          });
        }
      }
    });

    setReport(reportText);
  };

  const copyReport = () => {
    navigator.clipboard.writeText(report);
  };
  return (
    <section className="report__section">
      <div className="label__container">
        <label className="report__label">
          Имя:
          <input
            className="report__input"
            type="text"
            id="username"
            name="username"
            placeholder="Введите Ваше имя"
            value={name}
            onChange={handleNameChange}
          />
        </label>
      </div>
      <div className="button__container">
        <button className="report__button" onClick={generateReport} disabled={!isNameEntered}>
          Создать
        </button>
        <button className="report__button" onClick={copyReport} disabled={!report}>
          Копировать
        </button>
      </div>
      <pre className="report__text">{report}</pre>
    </section>
  );
}
