// Модули
import React, {useContext, useEffect, useState} from "react";
// Компоненты
import {CounterContext} from "../../components/Context/CounterContext";
//Стили
import "./ReportPage.css";

export default function ReportPage() {
  const {counters} = useContext(CounterContext);
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

    let reportText = `/#отчет ${name} ${currentDate}\n\n`;

    const groups = {
      categorical_group: [
        {text: "**Категорийка:**", id: ""},
        {text: "Предметка:", id: "Cat_item"},
        {text: "Моделька:", id: "Cat_model"},
        {text: "Баннер:", id: "Cat_banner"},
        {text: "Рендер:", id: "Cat_render"},
        {text: "Вопрос:", id: "Cat_ask"},
        {text: "Выгрузить:", id: "Cat_unloading"},
      ],

      PM_group: [
        {text: "**ПМ/БП:**", id: ""},
        {text: "Заказ товара:", id: "PM_order"},
        {text: "Отснято:", id: "PM_filmed"},
        {text: "Выгрузить П:", id: "PM_p"},
        {text: "Выгрузить М:", id: "PM_m"},
        {text: "Инфографика:", id: "PM_infographic"},
        {text: "Вопрос:", id: "PM_ask"},
        {text: "Корректировка:", id: "PM_adjustment"},
        {text: "Удалить:", id: "PM_unloading"},
      ],

      Paid_group: [
        {text: "**Платная съёмка:**", id: ""},
        {text: "Заказ товара:", id: "Paid_order"},
        {text: "Отснято:", id: "Paid_filmed"},
        {text: "Выгрузить П:", id: "Paid_p"},
        {text: "Выгрузить М:", id: "Paid_m"},
        {text: "Рендер:", id: "Paid_render"},
      ],

      additional_group: [
        {text: "**Доп. услуги:**", id: ""},
        {text: "Завершено:", id: "Additional_completed"},
        {text: "Отправлено ТЗ:", id: "Additional_tz"},
        {text: "На согласовании:", id: "Additional_coordination"},
        {text: "На уточнении:", id: "Additional_clarification"},
        {text: "Пришло сегодня:", id: "Additional_came"},
      ],
    };

    // Проходимся по каждой группе
    Object.keys(groups).forEach((groupKey) => {
      const group = groups[groupKey];

      // Проверяем, есть ли хотя бы одно ненулевое значение в группе
      const hasNonZeroValue = group.some((item) => {
        const counter = counters.find((counter) => counter.id === item.id);
        return counter && counter.value !== 0;
      });

      // Если есть хотя бы одно ненулевое значение, добавляем заголовок и значения
      if (hasNonZeroValue) {
        // Добавляем заголовок группы
        reportText += `${group[0].text}\n`;

        // Добавляем значения
        group.forEach((item) => {
          const counter = counters.find((counter) => counter.id === item.id);
          if (counter && counter.value !== 0) {
            reportText += `${item.text} ${counter.value}\n`; // Добавить значение счетчика в отчет
          }
        });
        reportText += "\n"; // Добавляем пустую строку после каждой группы для отделения
      }
    });

    setReport(reportText);
    copyReport(reportText);
  };

  const copyReport = (reportText) => {
    if (reportText) {
      navigator.clipboard.writeText(reportText).catch(() => {});
    }
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
        <button className="report__button" onClick={() => copyReport(report)} disabled={!report}>
          Копировать
        </button>
      </div>

      <pre className="report__text">{report}</pre>
    </section>
  );
}
