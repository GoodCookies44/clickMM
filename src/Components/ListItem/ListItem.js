//Модули
import React, {useState} from "react";
import PropTypes from "prop-types";
// Стили
import "./ListItem.css";

export default function ListItem({text}) {
  const [isIconChanged, setIsIconChanged] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [optionsByReason, setOptionsByReason] = useState({
    "Причина 1: Фотографии не соответствуют техническим требованиям": [
      "соотношение сторон не 1х1",
      "соотношение сторон не 3х4",
      "соотношение сторон не 1х1 и не 3х4",
      "разрешение менее 400х400 пикселей",
      "разрешение менее 900х1200 пикселей",
    ],
    "Причина 2: Нет доступа к фотографиям, или они не отсортированы": [
      "нет доступа к фотографиям, фото должны быть загружены в облако с доступом для просмотра",
      "папки с фотографиями не отсортированы",
    ],
    "Причина 3: Фотографии не отражают реальный вид товара": [
      "отсутствуют фотографии на которых товар виден полностью",
      "в карточке имеются только фотографии с макетом или эскизом товара",
    ],
    "Причина 4: Фотографии не качественные": [
      "на фото высокая зернистость",
      "на фото высокая замыленность",
      "фотографии сделаны на складе",
      "фотографии сделаны в домашних условиях",
      "фотографии сделаны с плохим освещением",
    ],
    "Причина 5: На фотографиях имеется запрещенная символика или информация": [
      "алкоголь, наркотики, порнография, оружие, жестокость, а также экстремистская и запрещенная законамиодательством Российской Федерации символика и информация (радужные флаги, свастика, правый сектор и т.д.)",
    ],
    "Причина 6: Отсутствие размытия на товарах 18+": [
      "товары на которых имеется имитация интимных частей тела",
      "на товаре или упаковке присутствуют изображения интимного характера",
      "на товаре или упаковке присутствуют нецензурные надписи",
    ],
    "Причина 7: На фото товара имеется информация рекламного характера": [
      "на фото присутствуют водяные знаки, ссылки, контакты продавца, логотипы, цены, акции, скидки, скриншоты с других маркетплейсов, данные о количестве продаж, призывы к покупке товара и другую рекламу",
      "используется стоп-слово распродажа, sales, премиум, хит, тренд, акция, выгодно, дешевый, лучшая цена, новинка, скидки, кэшбэк, оригинал, оригинальный, отзывы покупателей",
    ],
    "Причина 10: Иные причины": [
      "повторный запрос",
      "в карточке товара, под данным ШК, нет отметки о студийных фотографиях, продавец сам может изменить фото, потом подать заявку на проверку фото",
      "разрешение одной из сторон больше 5000 пикселей",
      "вес фотографий слишком большой, мы не можем загружать фото весом более 5 Мб",
      "цвет товара на фото от продавца отличается от цвета на студийных фотографиях",
      "форма товара на фото от продавца отличается от формы на студийных фотографиях",
      "риск интерпретации контента как пропаганды ЛГБТ",
    ],
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option) => {
    const selectedIndex = selectedOptions.indexOf(option);
    if (selectedIndex === -1) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions([
        ...selectedOptions.slice(0, selectedIndex),
        ...selectedOptions.slice(selectedIndex + 1),
      ]);
    }
  };

  const handleCopyText = () => {
    const selectedText =
      selectedOptions.length > 0 ? `${text} (${selectedOptions.join(", ")})` : text;
    navigator.clipboard.writeText(selectedText);
    setIsOpen(false);
    setSelectedOptions([]);

    setIsIconChanged(true);
    setTimeout(() => {
      setIsIconChanged(false);
    }, 2000);
  };

  return (
    <div className="list__container">
      <div className={`dropdown__content ${isOpen ? "open" : ""}`}>
        <span onClick={toggleDropdown}>{text}</span>
        {isOpen && optionsByReason[text] && optionsByReason[text].length > 0 && (
          <ul>
            {optionsByReason[text].map((option, index) => (
              <li key={index}>
                <label className="checkbox-label ">
                  <input
                    type="checkbox"
                    className="hidden-checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  {option}
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
                      {selectedOptions.includes(option) && (
                        <path
                          className="custom-marker"
                          d="M3 10L9 16L18 4"
                          stroke="#16ff65"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                    </svg>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
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
}

// Определение PropTypes
ListItem.propTypes = {
  text: PropTypes.string.isRequired,
};
