/* eslint-disable */
//Модули
import React, {useEffect, useState} from "react";
import axios from "axios";
// Компоненты
import Loading from "../../components/Loading/Loading";
// Стили
import "./KaitenAPIPage.css";

export default function KaitenAPIPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sheets, setSheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [isListOpen, setIsListOpen] = useState(false);
  const [notifications, setNotifications] = useState({});

  const spreadsheetId = "1n-xbHBg556tvVYZCQSPjqPcd_XwNeQ7BDTKmJ867dF8";
  const tokenKaiten = "eccf8d56-7ecb-48e0-b62c-108345c3d2eb";

  const taskLabels = {
    tz: {
      barcode: "Штрихкоды",
      link: "Ссылка на рефенсы",
      comment: "Комментарий",
    },
    mcs: {
      barcode: "Штрихкоды",
      comment: "Комментарий",
    },
    sp: {
      barcode: "Штрихкоды",
      comment: "Комментарий",
    },
    rc: {
      barcode: "Штрихкоды",
      comment: "Комментарий",
    },
    vw: {
      barcode: "Штрихкоды",
      comment: "Комментарий",
    },
    video: {
      barcode: "Штрихкоды",
      comment: "Комментарий",
    },
    vr: {
      barcode: "Штрихкоды",
      comment: "Комментарий",
    },
    bai: {
      color: "Цвета",
      content: "Содержимое",
      link: "Ссылка на логотип",
      differences: "Чем выделяется магазин",
      market: "Ссылка на магазин",
      comment: "Комментарий",
    },
    ig: {
      barcode: "Штрихкоды",
      slides: "Количество слайдов",
      name: "Название товара",
      link1: "Ссылка на товар",
      photo: "Фото с ФС",
      link2: "Ссылка на фото с ФС",
      differences: "Чем выделяется товар",
      size: "Размеры товара",
      color: "Цвета",
      comment: "Комментарий",
    },
    pt: {
      barcode: "Штрихкоды",
      quantity: "Количество фото",
      photo: "Фото с ФС",
      link: "Ссылка на фото",
      changes: "Что изменить",
      balance: "Баланс белого",
      correction: "Цветокоррекция",
      dust: "Убрать пыль/грязь/царапины",
      version: "Свой вариант",
      comment: "Комментарий",
    },
    yov: {
      service: "Опишите услугу",
      barcode: "Штрихкоды",
      comment: "Комментарий",
    },
  };

  const getTags = (task) => {
    const tags = [];
    if (task.moc === "Электронная почта") {
      tags.push("Почта");
    } else if (task.moc === "Telegram") {
      tags.push("Telegram");
    } else if (task.moc === "What's app") {
      tags.push("What's app");
    }

    return tags;
  };

  const taskData = {
    getTags: (task) => getTags(task),

    tz: (task) => ({
      description: `**ИП продавца:** ${task.id}\n**Штрихкод:** ${
        task.other.barcode
      }\n**Вид услуги:** ${task.task}\n**ТЗ:**\n **Ссылка на референсы:** ${
        task.other.link || "Нет комментария"
      }\n **Комментарий:** ${task.other.comment || "Нет комментария"}`,

      boardId: 988999,

      tag_name: "Съемка по ТЗ",
    }),

    mcs: (task) => ({
      description: `**ИП продавца:** ${task.id}\n**Штрихкод:** ${
        task.other.barcode
      }\n**Вид услуги:** ${task.task}\n**ТЗ:**\n ${task.other.comment || "Нет комментария"}`,

      boardId: 989444,

      tag_name: "Детская модельная съемка",
    }),

    sp: (task) => ({
      description: `**ИП продавца:** ${task.id}\n**Штрихкод:** ${
        task.other.barcode
      }\n**Вид услуги:** ${task.task}\n**ТЗ:**\n ${task.other.comment || "Нет комментария"}`,

      boardId: 989010,

      tag_name: "Предметная съемка 360",
    }),

    rc: (task) => ({
      description: `**ИП продавца:** ${task.id}\n**Штрихкод:** ${
        task.other.barcode
      }\n**Вид услуги:** ${task.task}\n**ТЗ:**\n ${task.other.comment || "Нет комментария"}`,
      boardId: 989446,

      tag_name: "Rich-content",
    }),

    vw: (task) => ({
      description: `**ИП продавца:** ${task.id}\n**Штрихкод:** ${
        task.other.barcode
      }\n**Вид услуги:** ${task.task}\n**ТЗ:**\n ${task.other.comment || "Нет комментария"}`,

      boardId: 989009,

      tag_name: "Видеопроходка",
    }),

    video: (task) => ({
      description: `**ИП продавца:** ${task.id}\n**Штрихкод:** ${
        task.other.barcode
      }\n**Вид услуги:** ${task.task}\n**ТЗ:**\n ${task.other.comment || "Нет комментария"}`,

      boardId: 997368,

      tag_name: "Видео",
    }),

    vr: (task) => ({
      description: `**ИП продавца:** ${task.id}\n**Штрихкод:** ${
        task.other.barcode
      }\n**Вид услуги:** ${task.task}\n**ТЗ:**\n ${task.other.comment || "Нет комментария"}`,

      boardId: 997368,

      tag_name: "Видеообзор",
    }),
    bai: (task) => ({
      description: formatTaskDescription(task),

      boardId: 989967,

      tag_name: "Создание баннера и иконки магазина",
    }),

    ig: (task) => ({
      description: formatTaskDescription(task),

      boardId: 987150,

      tag_name: "Инфографика",
    }),

    pt: (task) => ({
      description: formatTaskDescription(task),

      boardId: 989448,

      tag_name: "Ретушь фотографий",
    }),

    yov: (task) => ({
      description: `**ИП продавца:** ${task.id}\n**Штрихкод:** ${
        task.other.barcode
      }\n**Вид услуги:** ${task.task}\n**ТЗ:**\n **Опишите услугу:** ${
        task.other.service || "Нет комментария"
      }\n**Комментарий:** ${task.other.comment || "Нет комментария"}`,

      boardId: 989447,

      tag_name: "Прочие услуги",
    }),
  };

  useEffect(() => {
    document.body.classList.add("body__custom");
    return () => {
      document.body.classList.remove("body__custom");
    };
  }, []);

  const formatTaskDescription = (task) => {
    const header = `**ИП продавца:** ${task.id}\n**Штрихкод:** ${
      task.other.barcode || "Нет данных"
    }\n**Вид услуги:** ${task.task}\n**ТЗ:**\n`;

    const body = Object.entries(task.other)
      .filter(([otherKey]) => otherKey !== "barcode") // Исключаем barcode из списка
      .map(([otherKey, otherValue]) => {
        const label = taskLabels[task.type]?.[otherKey] || otherKey;

        if (otherValue) {
          return `**${label}:** ${otherValue || "Нет данных"}`;
        }
      })
      .join("\n");

    return `${header}${body}`;
  };

  // Функция для получения списка листов
  const fetchSpreadsheetSheets = () => {
    chrome.runtime.sendMessage(
      {
        action: "getSpreadsheetSheets",
        spreadsheetId: spreadsheetId,
      },
      (response) => {
        if (response.success) {
          setSheets(response.sheets);
          setSelectedSheet(response.sheets[0]);
        } else {
          console.error("Ошибка при получении листов:", response.error);
        }
      }
    );
  };

  // Функция для получения данных из Google Sheets
  const fetchReportData = () => {
    if (!selectedSheet) return;
    chrome.runtime.sendMessage(
      {
        action: "fetchGoogleSheetsData",
        spreadsheetId: spreadsheetId,
        sheetName: selectedSheet,
      },
      (response) => {
        if (response.success) {
          const data = response.data;

          // const formattedTasks = data;
          if (data && Array.isArray(data)) {
            // Преобразование данных
            const formattedTasks = data
              .filter((row) => row[0])
              .map((row, index) => {
                const tasksByType = {
                  tz: {
                    index: index + 2,
                    id: row[0],
                    date: row[1],
                    task: row[2],
                    other: {
                      barcode: row[13],
                      link: row[14],
                      comment: row[15],
                    },
                    number: row[57] || "Нет данных",
                    mail: row[58] || "Нет данных",
                    moc: row[59] || "Нет данных",
                    kaiten: row[60] === "TRUE",
                    status: row[61] || "Нет данных",
                    type: "tz",
                  },

                  mcs: {
                    index: index + 2,
                    id: row[0],
                    date: row[1],
                    task: row[3],
                    other: {
                      barcode: row[16],
                      comment: row[17],
                    },
                    number: row[57] || "Нет данных",
                    mail: row[58] || "Нет данных",
                    moc: row[59] || "Нет данных",
                    kaiten: row[60] === "TRUE",
                    status: row[61] || "Нет данных",
                    type: "mcs",
                  },

                  sp: {
                    index: index + 2,
                    id: row[0],
                    date: row[1],
                    task: row[4],
                    other: {
                      barcode: row[18],
                      comment: row[19],
                    },
                    number: row[57] || "Нет данных",
                    mail: row[58] || "Нет данных",
                    moc: row[59] || "Нет данных",
                    kaiten: row[60] === "TRUE",
                    status: row[61] || "Нет данных",
                    type: "sp",
                  },

                  rc: {
                    index: index + 2,
                    id: row[0],
                    date: row[1],
                    task: row[5],
                    other: {
                      barcode: row[20],
                      comment: row[21],
                    },
                    number: row[57] || "Нет данных",
                    mail: row[58] || "Нет данных",
                    moc: row[59] || "Нет данных",
                    kaiten: row[60] === "TRUE",
                    status: row[61] || "Нет данных",
                    type: "rc",
                  },

                  vw: {
                    index: index + 2,
                    id: row[0],
                    date: row[1],
                    task: row[6],
                    other: {
                      barcode: row[22],
                      comment: row[23],
                    },
                    number: row[57] || "Нет данных",
                    mail: row[58] || "Нет данных",
                    moc: row[59] || "Нет данных",
                    kaiten: row[60] === "TRUE",
                    status: row[61] || "Нет данных",
                    type: "vw",
                  },

                  video: {
                    index: index + 2,
                    id: row[0],
                    date: row[1],
                    task: row[7],
                    other: {
                      barcode: row[24],
                      comment: row[25],
                    },
                    number: row[57] || "Нет данных",
                    mail: row[58] || "Нет данных",
                    moc: row[59] || "Нет данных",
                    kaiten: row[60] === "TRUE",
                    status: row[61] || "Нет данных",
                    type: "video",
                  },

                  vr: {
                    index: index + 2,
                    id: row[0],
                    date: row[1],
                    task: row[8],
                    other: {
                      barcode: row[26],
                      comment: row[27],
                    },
                    number: row[57] || "Нет данных",
                    mail: row[58] || "Нет данных",
                    moc: row[59] || "Нет данных",
                    kaiten: row[60] === "TRUE",
                    status: row[61] || "Нет данных",
                    type: "vr",
                  },

                  bai: {
                    index: index + 2,
                    id: row[0],
                    date: row[1],
                    task: row[9],
                    other: {
                      color: row[28],
                      content: row[29],
                      link: row[30],
                      differences: row[31],
                      market: row[32],
                      comment: row[33],
                    },
                    number: row[57] || "Нет данных",
                    mail: row[58] || "Нет данных",
                    moc: row[59] || "Нет данных",
                    kaiten: row[60] === "TRUE",
                    status: row[61] || "Нет данных",
                    type: "bai",
                  },

                  ig: {
                    index: index + 2,
                    id: row[0],
                    date: row[1],
                    task: row[10],
                    other: {
                      barcode: row[34],
                      slides: row[35],
                      name: row[36],
                      link1: row[37],
                      photo: row[38],
                      link2: row[39],
                      differences: row[40],
                      size: row[41],
                      color: row[42],
                      comment: row[43],
                    },
                    number: row[57] || "Нет данных",
                    mail: row[58] || "Нет данных",
                    moc: row[59] || "Нет данных",
                    kaiten: row[60] === "TRUE",
                    status: row[61] || "Нет данных",
                    type: "ig",
                  },

                  pt: {
                    index: index + 2,
                    id: row[0],
                    date: row[1],
                    task: row[11],
                    other: {
                      barcode: row[44],
                      quantity: row[45],
                      photo: row[46],
                      link: row[47],
                      changes: row[52],
                      balance: row[48],
                      correction: row[49],
                      dust: row[50],
                      version: row[51],
                      comment: row[53],
                    },
                    number: row[57] || "Нет данных",
                    mail: row[58] || "Нет данных",
                    moc: row[59] || "Нет данных",
                    kaiten: row[60] === "TRUE",
                    status: row[61] || "Нет данных",
                    type: "pt",
                  },

                  yov: {
                    index: index + 2,
                    id: row[0],
                    date: row[1],
                    task: row[12],
                    other: {
                      service: row[54],
                      barcode: row[55],
                      comment: row[56],
                    },
                    number: row[57] || "Нет данных",
                    mail: row[58] || "Нет данных",
                    moc: row[59] || "Нет данных",
                    kaiten: row[60] === "TRUE",
                    status: row[61] || "Нет данных",
                    type: "yov",
                  },
                };
                return tasksByType;
              });

            if (JSON.stringify(formattedTasks) !== JSON.stringify(tasks)) {
              setTasks(formattedTasks);
            }
          } else {
            console.error("Данные не в ожидаемом формате:", response.data);
          }
        } else {
          console.error("Ошибка при получении данных:", response.error);
        }
        setLoading(false);
      }
    );
  };

  // Запускаем периодический опрос
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchReportData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [tasks]);

  // Функция для создания карточки в Kaiten
  const createCardInKaiten = async (task) => {
    const taskType = task.type;

    if (!taskData[taskType]) {
      console.error("Неизвестный тип задачи:", taskType);
      return;
    }

    const cardData = taskData[taskType](task);
    const tags = taskData.getTags(task);

    // Опции для запроса на создание карточки
    const createOptions = {
      method: "POST",
      url: "https://magnit-market.kaiten.ru/api/latest/cards",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenKaiten}`,
      },
      data: {
        title: task.mail,
        board_id: cardData.boardId,
        description: cardData.description,
        position: 2,
        size_text: getSlidesOrBarcodes(task),
        due_date: task.date,
      },
    };

    try {
      // Создание карточки
      const createResponse = await axios.request(createOptions);
      const cardId = createResponse.data.id; // Получаем id созданной карточки

      // Добавляем основной тег
      const mainTag = cardData.tag_name;
      await addTag(cardId, mainTag);

      // Добавление дополнительных тегов
      for (const tag of tags) {
        await addTag(cardId, tag);
      }

      // Уведомление о создании карточки
      setNotifications((prev) => ({
        ...prev,
        [`${task.id}_${task.task}`]: "Карточка успешно создана!",
      }));

      setTimeout(() => {
        setNotifications((prev) => ({
          ...prev,
          [`${task.id}_${task.task}`]: null,
        }));
      }, 2000);
    } catch (error) {
      console.error("Ошибка:", error.response?.data || error.message);
      alert("Ошибка при создании карточки или добавлении тега!");
    }
    // Обновление значения kaiten в task
    task.kaiten = true;
    // Обновление значения в Google Таблице через отправку сообщения
    chrome.runtime.sendMessage(
      {
        action: "updateGoogleSheet",
        data: {
          spreadsheetId,
          sheetName: selectedSheet,
          rowIndex: task.index,
          columnIndex: 60,
          newValue: "TRUE",
        },
      },
      (response) => {
        if (response.success) {
        } else {
          alert("Ошибка при обновлении таблицы:", response.error);
        }
      }
    );
  };

  //Добавление тегов в карточку
  const addTag = async (cardId, tag) => {
    const addTagOptions = {
      method: "POST",
      url: `https://magnit-market.kaiten.ru/api/latest/cards/${cardId}/tags`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenKaiten}`,
      },
      data: {
        name: tag,
      },
    };

    try {
      await axios(addTagOptions);
    } catch (error) {
      console.error(`Ошибка при добавлении тега "${tag}":`, error);
    }
  };

  // Вызов функции для получения списка листов при монтировании компонента
  useEffect(() => {
    fetchSpreadsheetSheets();
  }, []);

  // Вызов функции для получения данных из выбранного листа при изменении выбранного листа
  useEffect(() => {
    if (selectedSheet) {
      fetchReportData();
    }
  }, [selectedSheet]);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const handleSheetSelect = (sheet) => {
    setSelectedSheet(sheet);
    setIsListOpen(false); // Закрываем список после выбора
  };

  // Обработчик для обновления данных с выбранного листа
  const handleUpdateClick = () => {
    setLoading(true);
    fetchReportData();
  };

  //Группировка данных по дате
  const formatDate = (dateString) => {
    const dateParts = dateString.split(" ")[0].split("-");
    const day = dateParts[2].padStart(2, "0"); // Добавляем ноль впереди, если нужно
    const month = dateParts[1].padStart(2, "0");
    const year = dateParts[0].slice(-2); // Берем последние 2 цифры года
    return `${day}.${month}.${year}`;
  };

  const groupedTasks = tasks.reduce((acc, taskGroup) => {
    Object.entries(taskGroup).forEach(([key, task]) => {
      if (task.date && task.task) {
        // Проверка на наличие даты и задачи
        const formattedDate = formatDate(task.date); // Преобразование даты
        if (!acc[formattedDate]) {
          acc[formattedDate] = [];
        }
        acc[formattedDate].push(task);
      }
    });
    return acc;
  }, {});

  const toggleTaskKaiten = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          kaiten: !task.kaiten,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  // Сортировка ключей (дат) в порядке возрастания
  const sortedDates = Object.keys(groupedTasks).sort((a, b) => {
    const [dayA, monthA, yearA] = a.split(".").map(Number);
    const [dayB, monthB, yearB] = b.split(".").map(Number);
    return new Date(yearB + 2000, monthB - 1, dayB) - new Date(yearA + 2000, monthA - 1, dayA);
  });

  const getSlidesOrBarcodes = (task) => {
    const getSlideText = (slides) => {
      // Извлекаем только числа из строки, если они есть
      const slidesNumber = parseInt(slides.match(/\d+/)?.[0] || 0, 10);

      const lastDigit = slidesNumber % 10;
      const lastTwoDigits = slidesNumber % 100;

      // Проверка на числа, оканчивающиеся на 11-14
      if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${slidesNumber} слайдов`;
      }

      // Для остальных случаев используем только последнюю цифру
      if (lastDigit === 1) {
        return `${slidesNumber} слайд`;
      } else if (lastDigit >= 2 && lastDigit <= 4) {
        return `${slidesNumber} слайда`;
      } else {
        return `${slidesNumber} слайдов`;
      }
    };

    if (task.other.slides) {
      return getSlideText(task.other.slides);
    } else if (task.other.barcode) {
      const barcodes = task.other.barcode.split(/[\s,\.]+/).filter((code) => /^\d+$/.test(code));

      const barcodeCount = barcodes.length;
      return `${barcodeCount} ШК`;
    } else {
      return "";
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="table__section">
      <div className="task__header">
        <nav className="nav__container">
          <div className="selector__container">
            <label className="label__selector" htmlFor="sheetSelect" onClick={toggleList}>
              Выберите лист:
            </label>

            <div className="custom__selector">
              <div className="selected__sheet" onClick={toggleList}>
                {selectedSheet || "Выберите лист"}
              </div>
              {isListOpen && (
                <ul className="sheet__list">
                  {sheets.map((sheet, index) => (
                    <li key={index} onClick={() => handleSheetSelect(sheet)}>
                      {sheet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <button className="counter__button kaiten" onClick={handleUpdateClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={`reset__button`}
            >
              <path
                d="M17.7507 4.04225C15.9264 2.72388 13.7044 2.07237 11.457 2.19685C9.2096 2.32133 7.0732 3.21424 5.40561 4.72603C4.95924 5.13069 4.26934 5.09689 3.86468 4.65052C3.46001 4.20415 3.49382 3.51426 3.94019 3.10959C5.97835 1.26185 8.58951 0.170517 11.3364 0.018374C14.0832 -0.133769 16.7989 0.662515 19.0287 2.27387C21.2584 3.88522 22.8668 6.21378 23.5845 8.86957C24.3021 11.5254 24.0855 14.3471 22.9708 16.8622C21.8561 19.3773 19.9111 21.433 17.4615 22.6851C15.0119 23.9372 12.2064 24.3096 9.51502 23.7399C6.82361 23.1702 4.40965 21.693 2.67745 19.5558C0.945255 17.4186 0 14.751 0 12C0 11.3975 0.488417 10.9091 1.09091 10.9091C1.6934 10.9091 2.18182 11.3975 2.18182 12C2.18182 14.2509 2.95521 16.4334 4.37246 18.182C5.78972 19.9307 7.76477 21.1392 9.96684 21.6053C12.1689 22.0715 14.4643 21.7668 16.4685 20.7424C18.4727 19.7179 20.0641 18.036 20.9761 15.9782C21.8881 13.9204 22.0654 11.6117 21.4782 9.43874C20.891 7.26582 19.5751 5.36063 17.7507 4.04225Z"
                fill="#F6F6F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.36364 0C4.96613 0 5.45455 0.488417 5.45455 1.09091V4.36364C5.45455 4.96613 4.96613 5.45455 4.36364 5.45455C3.76114 5.45455 3.27273 4.96613 3.27273 4.36364V1.09091C3.27273 0.488417 3.76114 0 4.36364 0Z"
                fill="#F6F6F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.27273 4.36364C3.27273 3.76114 3.76114 3.27273 4.36364 3.27273H7.63636C8.23886 3.27273 8.72727 3.76114 8.72727 4.36364C8.72727 4.96613 8.23886 5.45455 7.63636 5.45455H4.36364C3.76114 5.45455 3.27273 4.96613 3.27273 4.36364Z"
                fill="#F6F6F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </nav>
      </div>
      <section className="task__section">
        {sortedDates.map((date, index) => (
          <div key={index} className="task__group">
            <h3>{date}</h3>

            <div className="task__list">
              {groupedTasks[date]
                .slice()
                .reverse()
                .map((task, taskIndex) => (
                  <div key={taskIndex} className="task__item">
                    <TaskDetail label="Строка" value={task.index} />

                    <h4>{task.task}</h4>

                    <div className="task__info">
                      <h4>Доп. инфо:</h4>
                      {Object.entries(task.other).map(([otherKey, otherValue]) => {
                        const isLink = ["link", "link1", "link2", "market"].includes(otherKey);
                        return (
                          <TaskDetail
                            key={otherKey}
                            label={taskLabels[task.type]?.[otherKey] || otherKey}
                            value={otherValue}
                            isLink={isLink}
                          />
                        );
                      })}
                    </div>

                    <div className="task__contacts">
                      <TaskDetail label="Номер" value={task.number} />
                      <TaskDetail label="Почта" value={task.mail} />
                      <TaskDetail label="Способ связи" value={task.moc} />
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          className="hidden-checkbox"
                          checked={task.kaiten}
                          onChange={() => toggleTaskKaiten(task.id)}
                        />
                        Запрос создан
                        <div className="custom-checkbox__container">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path
                              className="custom-checkbox"
                              d="M1 15V5C1 2.79086 2.79086 1 5 1H15C17.2091 1 19 2.79086 19 5V15C19 17.2091 17.2091 19 15 19H5C2.79086 19 1 17.2091 1 15Z"
                              stroke="#F6F6F6"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              className="custom-marker"
                              d="M3 10L9 16L18 4"
                              stroke="#16ff65"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </label>

                      <TaskDetail label="Статус" value={task.status} />
                    </div>

                    <button
                      className="counter__button kaitenAPI"
                      onClick={() => createCardInKaiten(task, taskIndex)}
                    >
                      Создать карточку
                    </button>

                    {notifications[`${task.id}_${task.task}`] && (
                      <div className="notification">{notifications[`${task.id}_${task.task}`]}</div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}

function TaskDetail({label, value, isLink}) {
  if (!value) {
    return (
      <div className="task__param">
        <p>{label}:</p>
        <span>Нет данных</span>
      </div>
    );
  }

  if (isLink) {
    return (
      <div className="task__param">
        <a href={value} target="_blank" rel="nofollow noopener noreferrer">
          {label}
        </a>
      </div>
    );
  }

  return (
    <div className="task__param">
      <p>{label}:</p>
      <span>{value}</span>
    </div>
  );
}
/* eslint-enable */
