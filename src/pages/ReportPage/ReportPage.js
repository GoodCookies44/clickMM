// Модули
import React, {useContext, useEffect, useState} from "react";
import {CounterContext} from "../../components/Context/CounterContext";
//Стили
import "./ReportPage.css";

export default function ReportPage() {
  const {counters} = useContext(CounterContext); // Подставьте ваш контекст с данными
  const [name, setName] = useState(localStorage.getItem("username") || "");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [hiddenButton, setHiddenButton] = useState(false);
  const [isTextareaVisible, setIsTextareaVisible] = useState(false);
  const [dailyReport, setDailyReport] = useState("");
  const [report, setReport] = useState("");
  const [customGroups, setCustomGroups] = useState(() => {
    const savedGroups = localStorage.getItem("customGroups");
    return savedGroups ? JSON.parse(savedGroups) : [];
  });
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    setIsNameEntered(name.trim() !== "");
  }, [name]);

  useEffect(() => {
    localStorage.setItem("username", name);
  }, [name]);

  useEffect(() => {
    if (name === "Антон") {
      setHiddenButton(true);
    } else {
      setHiddenButton(false);
    }
  }, [name]);

  useEffect(() => {
    localStorage.setItem("customGroups", JSON.stringify(customGroups));
  }, [customGroups]);

  const handleNameChange = (event) => {
    const enteredName = event.target.value;
    setName(enteredName);
    setIsNameEntered(enteredName.trim() !== ""); // Устанавливаем флаг isNameEntered, если введено имя
  };

  const fetchReportData = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbw5kcr10u3Rvc9QBM01eA1bUuV-jPhUH0YmR4R1gfUOv7-bz4BXolv7T1X0CE07Ahm6/exec"
      );
      const data = await response.json();
      return data.users;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      return [];
    }
  };

  const handleDailyReport = async () => {
    const users = await fetchReportData();
    const today = new Date().toLocaleDateString();
    const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString(); // Завтра

    // Найти индекс объекта с сегодняшней датой
    const todayIndex = users.findIndex(
      (user) => new Date(user.Date).toLocaleDateString() === today
    );

    if (todayIndex === -1) return;

    // Найти индекс объекта с завтрашней датой и с категорией "По итогам недели" после `todayIndex`
    const afterTodayUsers = users.slice(todayIndex + 1);

    const tomorrowIndex = afterTodayUsers.findIndex(
      (user) => new Date(user.Date).toLocaleDateString() === tomorrow
    );
    const categoryIndex = afterTodayUsers.findIndex((user) => user.Category === "По итогам недели");

    // Найти минимальный индекс из найденных
    const endIndex = Math.min(
      tomorrowIndex === -1 ? users.length : tomorrowIndex + todayIndex + 1,
      categoryIndex === -1 ? users.length : categoryIndex + todayIndex + 1
    );

    // Собрать объекты от `todayIndex` до `endIndex`, включая объект с сегодняшней датой
    const filteredData = users.slice(todayIndex, endIndex);

    // Формирование отчета
    let reportText = `#отчет${name} ${currentDate}\n\n`;

    let currentCategory = "";
    let isFirstCategory = true;
    let itemIndex = 1;

    filteredData.forEach((user, index) => {
      if (user.Category && user.Category !== currentCategory) {
        if (!isFirstCategory) {
          reportText += `\n`;
        }
        reportText += `**Категории из ${user.Category}:**\n`;
        currentCategory = user.Category;
        isFirstCategory = false;
        itemIndex = 1;
      }

      const unnecessaryText = user.Unnecessary ? `, лишнее: ${user.Unnecessary}` : "";
      reportText += `${itemIndex}. ${user.Subcategory} (было: ${user.Before}, стало: ${user.After}${unnecessaryText})\n`;
      itemIndex++;
    });

    if (!isFirstCategory) {
      reportText += `\n`;
    }

    reportText += `**Обработано запросов от смежных отделов:**\n`;
    reportText += `\n**Обработано строк в таблице с выгрузкой некорректных категорий:**\n`;
    reportText += `\n**Внесено** _ **предложение по категории** ""\n`;
    reportText += `**Выполнено** _ **предложение по категории** ""\n`;

    setDailyReport(reportText);
    setIsTextareaVisible(true);
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
        {text: "Искусственно завышенная цена:", id: "MKT15"},
      ],

      pp_group: [{text: "**Модерация платного продвижения:**", id: "PP", addEmptyLineBefore: true}],

      umf_group: [
        {text: "**Упрощённая модерация фото:**", id: ""},
        {text: "Проверено запросов:", id: "UMF_request"},
        {text: "Проверено ШК:", id: "UMF_SHK"},
        {text: "Из них принято:", id: "UMF_accepted"},
        {text: "Отклонено:", id: "UMF_rejected"},
      ],

      kp_group: [
        {text: "**Обработано запросов в Kaiten, КП:**", id: "KP_Trello", addEmptyLineBefore: true},
        {text: "**Обработано запросов от КП (адм.):**", id: "KP_Adm"},
      ],

      bp_group: [
        {
          text: "**Обработано запросов в Kaiten, Бизнес:**",
          id: "BP_Business",
          addEmptyLineBefore: true,
        },
        {text: "**Обработано запросов в Kaiten, ОКК:**", id: "BP_OKK"},
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
        let mktGroupHasValues = false;

        group.forEach((item) => {
          const counter = counters.find((counter) => counter.id === item.id);
          if (counter && counter.value !== 0) {
            reportText += `\n${item.text} ${counter.value}`; // Добавить значение счетчика в отчет
            mktGroupHasValues = true;
            if (item.addEmptyLineAfter) {
              reportText += "\n";
            }
          }
        });
        if (mktGroupHasValues) {
          reportText += "\n";
        }
      } else {
        // Проверяем, есть ли хотя бы одно ненулевое значение в группе
        const hasNonZeroValue = group.some((item) => {
          const counter = counters.find((counter) => counter.id === item.id);
          return counter && counter.value !== 0;
        });

        // Если есть хотя бы одно ненулевое значение, отображаем все значения группы
        if (hasNonZeroValue) {
          // Для группы umf_group добавляем строку "Модерация фото продавцов"
          if (groupKey === "umf_group") {
            reportText += "\n**Упрощённая модерация фото:**\n";
          }

          group.forEach((item) => {
            const counter = counters.find((counter) => counter.id === item.id);
            if (
              counter &&
              (item.id !== "BP_Kont" || counter.value !== 0) &&
              (item.id !== "KP_Trello" || counter.value !== 0)
            ) {
              if (item.addEmptyLineBefore) {
                reportText += "\n";
              }
              reportText += `${item.text} ${counter.value}\n`; // Добавить значение счетчика в отчет
            }
          });
        }
      }
    });

    // Добавляем пользовательские группы к отчету
    customGroups.forEach((group, index) => {
      reportText += `\n**УМФ ${group.name}**: ${group.requests}`;
    });

    setReport(reportText);
    copyReport(reportText);
  };

  const addCustomGroup = () => {
    setCustomGroups([{name: "", requests: 0}, ...customGroups]);
  };

  const removeCustomGroup = (index) => {
    setCustomGroups(customGroups.filter((_, i) => i !== index));
  };

  const removeAllCustomGroups = () => {
    setCustomGroups([]);
  };

  const handleCustomGroupChange = (index, field, value) => {
    const updatedGroups = customGroups.map((group, i) =>
      i === index ? {...group, [field]: value} : group
    );
    setCustomGroups(updatedGroups);
  };

  const copyReport = (text) => {
    const reportText = text || dailyReport;
    if (!reportText) return;

    navigator.clipboard.writeText(reportText);
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
        <button
          className="report__button"
          onClick={() => copyReport(report)}
          disabled={!report && !dailyReport}
        >
          Копировать
        </button>
        <button className="report__button" onClick={addCustomGroup}>
          Добавить
        </button>
        <button className="report__button" onClick={removeAllCustomGroups}>
          Удалить
        </button>
      </div>

      {hiddenButton && (
        <div className="hidden__button">
          <button className="report__button" onClick={handleDailyReport}>
            Дневной отчёт
          </button>
          <button className="report__button">Недельный отчёт</button>
        </div>
      )}

      {customGroups.map((group, index) => (
        <div key={index} className="custom-group">
          <input
            className="report__input"
            type="text"
            placeholder="Название компании"
            value={group.name}
            onChange={(e) => handleCustomGroupChange(index, "name", e.target.value)}
          />

          <input
            className="report__input number"
            type="number"
            placeholder="Запросы"
            value={group.requests !== 0 ? group.requests : ""}
            onChange={(e) => handleCustomGroupChange(index, "requests", e.target.value)}
          />

          <button className="report__button" onClick={() => removeCustomGroup(index)}>
            Удалить
          </button>
        </div>
      ))}

      <pre className="report__text">{report}</pre>

      {isTextareaVisible && (
        <div>
          <div className="notepad__textarea" contenteditable="true">
            {dailyReport}
          </div>
        </div>
      )}
    </section>
  );
}
