// Модули
import React, {useEffect, useState} from "react";
import Fuse from "fuse.js";
// Компоненты

export default function CardChecker({cards}) {
  const [referenceCards, setReferenceCards] = useState([]);
  const [nonMatchingCards, setNonMatchingCards] = useState([]);

  // Загружаем эталонные карточки из localStorage при монтировании компонента
  useEffect(() => {
    const savedReferenceCards = JSON.parse(localStorage.getItem("referenceCards")) || [];
    setReferenceCards(savedReferenceCards);
  }, []);

  // Обработчик для получения данных карточек
  const handleCheckCards = (selectedCards) => {
    // Настройки Fuse.js для нечёткого поиска по названию
    const fuse = new Fuse(referenceCards, {
      keys: ["name"], // Сравниваем по названию карточки
      threshold: 0.4, // Чем ниже порог, тем строже совпадение (0.4 — среднее)
    });

    const nonMatching = selectedCards.filter((card) => {
      const result = fuse.search(card.name);
      return result.length === 0; // Если не нашлось совпадений, добавляем карточку
    });

    setNonMatchingCards(nonMatching);

    // Отправка не подходящих карточек обратно в contentscript.js
    chrome.runtime.sendMessage({action: "highlightCards", cards: nonMatching});
  };

  // Отрисовка компонента
  return (
    <div>
      <h1>Card Checker</h1>
      <button onClick={() => handleCheckCards(nonMatchingCards)}>Проверить карточки</button>
      <h2>Не подходящие карточки</h2>
      <ul>
        {nonMatchingCards.map((card) => (
          <li key={card.id}>
            {card.name} (ID: {card.id})
          </li>
        ))}
      </ul>
    </div>
  );
}
