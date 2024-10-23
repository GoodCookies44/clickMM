/* eslint-disable */
//Модули
import React, {useContext} from "react";
// Компоненты
import ResetCountersButton from "../../components/ResetCountersButton/ResetCountersButton";
import {CounterContext} from "../../components/Context/CounterContext";
// Стили
import "./CardChecker.css";

const CardChecker = () => {
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

  return (
    <section className="counter__section FP CC">
      <div className="rb_container">
        <ResetCountersButton wordIds={["includeWords", "excludeWords"]} />
      </div>
      <textarea
        className="notepad__textarea"
        placeholder="Слова, которые должны быть"
        id="includeWords"
        value={words.includeWords}
        onChange={handleInputChange}
      />
      <textarea
        className="notepad__textarea"
        placeholder="Слова, которые не должны быть"
        id="excludeWords"
        value={words.excludeWords}
        onChange={handleInputChange}
      />

      <button className="notepad__button" onClick={handleCheck}>
        Проверить
      </button>
    </section>
  );
};

export default CardChecker;
/* eslint-enable */
