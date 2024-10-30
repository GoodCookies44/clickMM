/* eslint-disable */
//Модули
import React, {useContext} from "react";
// Компоненты
import ResetCountersButton from "../../components/ResetCountersButton/ResetCountersButton";
import {CounterContext} from "../../components/Context/CounterContext";
// Стили
import "./CardChecker.css";

export default function CardChecker() {
  const {words, updateWords} = useContext(CounterContext);

  const handleInputChange = (e) => {
    const {id, value} = e.target;
    updateWords(id, value);
  };

  const handleCheck = () => {
    chrome.runtime.sendMessage({
      action: "CHECK_TITLES",
      includeWords: words.includeWords,
      excludeWords: words.excludeWords,
    });
  };

  const handleCheckCategories = () => {
    chrome.runtime.sendMessage({
      action: "FETCH_CATEGORIES",
    });
  };

  return (
    <section className="counter__section FP CC">
      <div className="rb_container">
        <ResetCountersButton wordIds={["includeWords", "excludeWords"]} />
      </div>
      <label className="label__container">Слова, которые должны быть</label>
      <textarea
        className="notepad__textarea"
        id="includeWords"
        value={words.includeWords}
        onChange={handleInputChange}
      />
      <label className="label__container">Слова, которые не должны быть</label>
      <textarea
        className="notepad__textarea"
        id="excludeWords"
        value={words.excludeWords}
        onChange={handleInputChange}
      />
      <div className="btn__container">
        <button className="notepad__button" onClick={handleCheck}>
          Проверить
        </button>
        <button className="notepad__button" onClick={handleCheckCategories}>
          Проверить категории
        </button>
      </div>
    </section>
  );
}
/* eslint-enable */
