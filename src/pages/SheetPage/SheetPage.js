// Модули
import React, {useState} from "react";
// Компоненты
import ListItem from "../../components/ListItem/ListItem";
// Стили
import "./SheetPage.css";

export default function SheetPage() {
  const [TableUrl, setTableUrl] = useState("");
  const [ListVisible, setListVisible] = useState(false);

  const toggleListVisibility = () => {
    setListVisible((prevState) => !prevState);
  };

  // Функция для обновления URL в состоянии
  const handleInputChange = (event) => {
    setTableUrl(event.target.value);
  };

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
            <iframe className="sheet__iframe" src={TableUrl} title="Google Sheet"></iframe>
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
