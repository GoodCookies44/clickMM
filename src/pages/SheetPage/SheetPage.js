/* eslint-disable */
// Модули
import React, {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
// Компоненты
import Loading from "../../components/Loading/Loading";
import {CounterContext} from "../../components/Context/CounterContext";

// Стили
import "./SheetPage.css";

export default function SheetPage() {
  const {TableUrl, saveTableUrl, iframeHeight, updateIframeHeight} = useContext(CounterContext);
  const iframeRef = useRef(null);
  const isResizingRef = useRef(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sheets, setSheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [isListOpen, setIsListOpen] = useState(false);

  // Функция для получения spreadsheetId из TableUrl
  const getSpreadsheetIdFromUrl = (url) => {
    const regex = /\/d\/([a-zA-Z0-9-_]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Функция для обновления URL в состоянии
  const handleInputChange = (event) => {
    const newUrl = event.target.value;
    saveTableUrl(newUrl);
  };

  // Функция для получения списка листов
  const fetchSpreadsheetSheets = () => {
    const spreadsheetId = getSpreadsheetIdFromUrl(TableUrl);
    if (!spreadsheetId) {
      console.error("Ошибка: Неверный URL");
      return;
    }

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

  // Вызов функции для получения списка листов при изменении TableUrl
  useEffect(() => {
    if (TableUrl) {
      fetchSpreadsheetSheets();
    }
  }, [TableUrl]);

  // Функция для получения данных из Google Sheets
  const fetchReportData = () => {
    if (!selectedSheet) return;
    const spreadsheetId = getSpreadsheetIdFromUrl(TableUrl);
    if (!spreadsheetId) return;

    setLoading(true); // Устанавливаем загрузку только при наличии URL

    chrome.runtime.sendMessage(
      {
        action: "fetchGoogleSheetsData",
        spreadsheetId: spreadsheetId,
        sheetName: selectedSheet,
      },
      (response) => {
        if (response.success) {
          const data = response.data;

          if (data && Array.isArray(data)) {
            // Преобразование данных
            const formattedTasks = data
              .filter((row) => row && row.length > 0) // Проверяем на непустые строки
              .map((row, index) => {
                const tasksByType = {
                  // Здесь можно добавить логику для преобразования строки в задачу
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
        setLoading(false); // Устанавливаем загрузку в false после завершения запроса
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
    if (TableUrl) {
      setLoading(true);
      fetchReportData();
    }
  };

  const startResizing = (e) => {
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
  };

  const handleMouseMove = (e) => {
    if (isResizingRef.current && iframeRef.current) {
      const containerRect = iframeRef.current.parentElement.getBoundingClientRect();
      const newHeight = e.clientY - containerRect.top;
      const minHeight = window.innerHeight * 0.5;
      updateIframeHeight(Math.max(newHeight, minHeight));
    }
  };

  const stopResizing = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopResizing);
    };
  }, []);

  // Выводим индикатор загрузки только если установлен TableUrl
  if (loading && TableUrl) {
    return <Loading />;
  }

  return (
    <>
      <section className="sheet__container">
        <input
          className="sheet__input"
          type="text"
          placeholder="Вставьте URL"
          value={TableUrl}
          onChange={handleInputChange}
        />

        {TableUrl && (
          <>
            <div style={{position: "relative", width: "100%"}}>
              <iframe
                ref={iframeRef}
                className="sheet__iframe"
                src={TableUrl}
                title="Google Sheet"
                style={{height: `${iframeHeight}px`}}
              ></iframe>
              <svg
                className="iframe__resizer"
                onMouseDown={startResizing}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1920 1920"
                fill="#F6F6F6"
              >
                <path d="M960.182.012 451 509.193l82.7 82.817 368.112-368.113v1472.217L533.7 1328.12l-82.7 82.7L960.182 1920l509.181-509.182-82.582-82.7-368.113 367.996V223.897l368.113 368.113 82.582-82.817z" />
              </svg>
            </div>
          </>
        )}

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
                  d="M4.36364 0C4.96613 0 5.45455 0.488417 5.45455 1.09091V4.36364C5.45455 4.96613 4.96613 5.45455 4.36364 5.45455C3.76114 5.45455 3.27273 4.96613 3.27273 4.36364V1.09091C3.27273 0.488417 4.36364 0 4.36364 0Z"
                  fill="#F6F6F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.27273 4.36364C3.27273 4.36364 4.36364 4.36364 4.36364 5.45455 4.36364 6.54524 5.45455 5.45455 5.45455 6.54524V10.3636C5.45455 10.9661 5.45455 12.3636 4.36364 12.3636C3.76114 12.3636 3.27273 11.8742 3.27273 11.2727V6.54524C3.27273 5.45455 3.27273 4.36364 3.27273 4.36364Z"
                  fill="#F6F6F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </nav>
        </div>

        {/* Вывод данных */}
        <div className="tasks__container">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div key={index} className="task__item">
                {/* Замените это на свой вывод данных задачи */}
                <pre>{JSON.stringify(task, null, 2)}</pre>
              </div>
            ))
          ) : (
            <div className="no__tasks">Нет задач для отображения.</div>
          )}
        </div>
      </section>
    </>
  );
}
/* eslint-enable */
