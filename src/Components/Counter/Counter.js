import React, {useState, useEffect} from "react";

const Counter = () => {
  // Состояние счетчика
  const [count, setCount] = useState(0);

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
    setCount(0);
    saveCountToStorage(0);
  };

  // Функция для сохранения значения в Chrome Storage
  const saveCountToStorage = (value) => {
    chrome.storage.sync.set({count: value}, () => {
      if (chrome.runtime.lastError) {
        console.error("Error saving value to storage:", chrome.runtime.lastError);
      } else {
        console.log("Value saved to storage: " + value);
      }
    });
  };

  // Эффект, срабатывающий при монтировании компонента, для загрузки значения из Chrome Storage
  useEffect(() => {
    chrome.storage.sync.get(["count"], (result) => {
      if (result.count !== undefined) {
        setCount(result.count);
        console.log("Value loaded from storage: " + result.count);
      }
    });
  }, [setCount]); // Передаем setCount в массив зависимостей

  // Визуализация компонента
  return (
    <div>
      <p>Счётчик: {count}</p>
      <button onClick={increment}>Добавить</button>
      <button onClick={decrement}>Убавить</button>
      <button onClick={reset}>Сбросить</button>
    </div>
  );
};

export default Counter;
