// Модули
import React, {useContext, useEffect, useRef, useState} from "react";
// Компоненты
import ListItem from "../../components/ListItem/ListItem";
import {CounterContext} from "../../components/Context/CounterContext";
// Стили
import "./SheetPage.css";

export default function SheetPage() {
  const {TableUrl, saveTableUrl, iframeHeight, updateIframeHeight} = useContext(CounterContext);
  const [ListVisible, setListVisible] = useState(false);
  const iframeRef = useRef(null);
  const isResizingRef = useRef(false);

  const toggleListVisibility = () => {
    setListVisible((prevState) => !prevState);
  };

  // Функция для обновления URL в состоянии
  const handleInputChange = (event) => {
    const newUrl = event.target.value;
    saveTableUrl(newUrl);
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
      </section>
      {TableUrl && (
        <>
          <section className="list__section FP sheet">
            <div className="paragraph__container inline" onClick={toggleListVisibility}>
              <p>Причины отказа</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`arrow-icon ${ListVisible ? "open" : ""}`}
                width="8"
                height="14"
                viewBox="0 0 8 14"
                strokeWidth="2"
                fill="none"
              >
                <path d="M7 1L1 7L7 13" stroke="#F6F6F6" />
              </svg>
            </div>
            {ListVisible && (
              <ul>
                <li>
                  <ListItem text={"Уже стоит отметка о студийных фотографиях"} />
                </li>
                <li>
                  <ListItem
                    text={"Причина 1: Фотографии не соответствуют техническим требованиям"}
                  />
                </li>
                <li>
                  <ListItem
                    text={"Причина 2: Нет доступа к фотографиям, или они не отсортированы"}
                  />
                </li>
                <li>
                  <ListItem text={"Причина 3: Фотографии не отражают реальный вид товара"} />
                </li>
                <li>
                  <ListItem text={"Причина 4: Фотографии не качественные"} />
                </li>
                <li>
                  <ListItem
                    text={"Причина 5: На фотографиях имеется запрещенная символика или информация"}
                  />
                </li>
                <li>
                  <ListItem text={"Причина 6: Отсутствие размытия на товарах 18+"} />
                </li>
                <li>
                  <ListItem
                    text={"Причина 7: На фото товара имеется информация рекламного характера"}
                  />
                </li>
                <li>
                  <ListItem text={"Причина 8: Товары в запросе из других категорий"} />
                </li>
                <li>
                  <ListItem
                    text={
                      "Причина 9: Неверно заполнена форма запроса или превышен лимит количества ШК на проверку в одном запросе (20 - по блоку №1, 1 по блоку №2)"
                    }
                  />
                </li>
                <li>
                  <ListItem text={"Причина 10: Иные причины"} />
                </li>
              </ul>
            )}
          </section>
        </>
      )}
    </>
  );
}
