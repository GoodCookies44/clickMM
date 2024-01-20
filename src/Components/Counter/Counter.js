import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

const Counter = ({id, initialValue}) => {
  // Состояние счетчика
  const [count, setCount] = useState(initialValue);

  // Функция для увеличения значения счетчика и сохранения в Chrome Storage
  const increment = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      saveCountToStorage(newCount);
      return newCount;
    });
  };

  // Функция для уменьшения значения счетчика и сохранения в Chrome Storage
  const decrement = () => {
    setCount((prevCount) => {
      const newCount = prevCount - 1;
      saveCountToStorage(newCount);
      return newCount;
    });
  };

  // Функция для сброса значения счетчика и сохранения в Chrome Storage
  const reset = () => {
    setCount(initialValue);
    saveCountToStorage(initialValue);
  };

  // Функция для сохранения значения в Chrome Storage
  const saveCountToStorage = (value) => {
    chrome.storage.sync.set({[id]: value}, () => {
      if (chrome.runtime.lastError) {
        console.error("Error saving value to storage:", chrome.runtime.lastError);
      } else {
        console.log(`Value saved to storage for ${id}: ${value}`);
      }
    });
  };

  // Эффект, срабатывающий при монтировании компонента, для загрузки значения из Chrome Storage
  useEffect(() => {
    chrome.storage.sync.get([id], (result) => {
      if (result[id] !== undefined) {
        setCount(result[id]);
        console.log(`Value loaded from storage for ${id}: ${result[id]}`);
      }
    });
  }, [id, setCount]); // Передаем id и setCount в массив зависимостей

  // Визуализация компонента
  return (
    <div>
      <p>{`Счётчик ${id}: ${count}`}</p>
      <button onClick={increment}>Добавить</button>
      <button onClick={decrement}>Убавить</button>
      <button onClick={reset}>Сбросить</button>
    </div>
  );
};

Counter.propTypes = {
  id: PropTypes.string.isRequired,
  initialValue: PropTypes.number.isRequired,
};

export default Counter;
