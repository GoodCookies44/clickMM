//Модули
import React, {useState} from "react";
import PropTypes from "prop-types";
// Стили
import "./ListItem.css";

const ListItem = ({text}) => {
  const [isIconChanged, setIsIconChanged] = useState(false);

  const handleCopyText = () => {
    // Копирование текста в буфер обмена
    navigator.clipboard.writeText(text);

    // Изменение иконки на 2 секунды
    setIsIconChanged(true);
    setTimeout(() => {
      setIsIconChanged(false);
    }, 2000);
  };

  return (
    <div className="list__container">
      <span>{text}</span>
      <div className="copy__button" onClick={handleCopyText}>
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.66667 4.4375V3.44444C4.66667 2.09442 5.76108 1 7.11111 1H15.6667C17.0167 1 18.1111 2.09442 18.1111 3.44444V16.8889C18.1111 18.2389 17.0167 19.3333 15.6667 19.3333H14.4444M1 7.11111V20.5556C1 21.9056 2.09442 23 3.44444 23H12C13.35 23 14.4444 21.9056 14.4444 20.5556V7.11111C14.4444 5.76108 13.35 4.66667 12 4.66667H3.44444C2.09442 4.66667 1 5.76108 1 7.11111Z"
            stroke={isIconChanged ? "#16ff65" : "#F6F6F6"} // Изменение цвета иконки
          />
        </svg>
      </div>
    </div>
  );
};

// Определение PropTypes
ListItem.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ListItem;
