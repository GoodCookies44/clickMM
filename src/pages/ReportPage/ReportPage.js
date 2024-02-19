// Модули
import React, {useContext, useState} from "react";
import {CounterContext} from "../../components/Context/CounterContext";

export default function ReportPage() {
  const {counters} = useContext(CounterContext); // Подставьте ваш контекст с данными
  const [name, setName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [report, setReport] = useState("");
  const currentDate = new Date().toLocaleDateString();

  const handleNameChange = (event) => {
    const enteredName = event.target.value;
    setName(enteredName);
    setIsNameEntered(enteredName.trim() !== ""); // Устанавливаем флаг isNameEntered, если введено имя
  };

  const generateReport = () => {
    if (!name.trim()) {
      return;
    }

    let reportText = `#отчет${name} ${currentDate}\n\n`;

    const groups = {
      mkt_group: [
        {text: "**Модерация карточек товара:**", id: "MKT"},
        {text: "Отклонено:", id: "MKT_Sum"},
        {text: "Описание в карточке не соответствует товару:", id: "MKT1"},
        {text: "Пересорт:", id: "MKT2"},
        {text: "Запрещенный к продаже товар для самозанятых:", id: "MKT3"},
        {text: "Запрещенный к продаже товар:", id: "MKT4"},
        {text: "Использование карточки для другого товара:", id: "MKT5"},
        {text: "По запросу правообладателя товарного знака:", id: "MKT6"},
        {text: "Фотография в карточке не соответствует товару:", id: "MKT7"},
        {text: "Изображение упаковки не соответствует фактической:", id: "MKT8"},
        {text: "Использование фотографий другого продавца:", id: "MKT9"},
        {text: "Подозрение на контрафакт:", id: "MKT10"},
        {text: "По запросу контролирующих органов:", id: "MKT11"},
        {text: "По запросу контролирующих органов ФАС:", id: "MKT12"},
      ],
      pp_group: [{text: "**Модерация платного продвижения:**", id: "PP"}],
      mfp_group: [
        {text: "**Модерация фото продавцов:**", id: ""},
        {text: "Проверено запросов:", id: "MFP_request"},
        {text: "Проверено ШК:", id: "MFP_SHK"},
        {text: "Из них принято:", id: "MFP_accepted"},
        {text: "Отклонено:", id: "MFP_rejected"},
        {text: "На доработку:", id: "MFP_revision"},
      ],
      dfp_group: [
        {text: "**Обработано запросов на добавление фото продавца:**", id: "DFP_request"},
        {text: "Принято:", id: "DFP_accepted"},
        {text: "Отклонено:", id: "DFP_rejected"},
      ],
      kp_group: [
        {text: "**Обработано запросов в Trello, КП:**", id: "KP_Trello"},
        {text: "**Обработано запросов от КП (адм.):**", id: "KP_Adm"},
      ],
      bp_group: [
        {text: "**Обработано запросов в Trello, Бизнес:**", id: "BP_Business"},
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
            reportText += `${item.text} ${counter.value}\n`; // Добавить значение счетчика в отчет
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
            reportText += "**Модерация фото продавцов:**\n";
          }
          group.forEach((item) => {
            const counter = counters.find((counter) => counter.id === item.id);
            if (counter) {
              reportText += `${item.text} ${counter.value}\n`; // Добавить значение счетчика в отчет
            }
          });
        }
      }

      reportText += "\n"; // Добавить пустую строку между группами
    });

    setReport(reportText);
  };

  const copyReport = () => {
    navigator.clipboard.writeText(report);
  };
  return (
    <div>
      <h1>Генерация отчета</h1>
      <label>
        Имя:
        <input type="text" id="username" name="username" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <button onClick={generateReport} disabled={!isNameEntered}>
        Сгенерировать отчет
      </button>
      <button onClick={copyReport} disabled={!report}>
        Скопировать отчет
      </button>
      <pre>{report}</pre>
    </div>
  );
}
