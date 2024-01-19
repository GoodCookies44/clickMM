import React, {useState, useEffect} from "react";

const Counter = () => {
  // Состояние счетчика
  const [count, setCount] = useState(0);

  // Функция для увеличения значения счетчика и сохранения в Chrome Storage
  const increment = () => {
    setCount(count + 1);
    saveCountToStorage(count + 1);
  };

  // Функция для уменьшения значения счетчика и сохранения в Chrome Storage
  const decrement = () => {
    setCount(count - 1);
    saveCountToStorage(count - 1);
  };

  // Функция для сохранения значения в Chrome Storage
  const saveCountToStorage = (value) => {
    chrome.storage.sync.set({count: value}, () => {
      console.log("Value is set to " + value);
    });
  };

  // Эффект, срабатывающий при монтировании компонента, для загрузки значения из Chrome Storage
  useEffect(() => {
    chrome.storage.sync.get(["count"], (result) => {
      if (result.count !== undefined) {
        setCount(result.count);
        console.log("Value currently is " + result.count);
      }
    });
  }, []); // Пустой массив зависимостей, чтобы useEffect вызывался только при монтировании

  // Визуализация компонента
  return (
    <div>
      <p>Счётчик: {count}</p>
      <button onClick={increment}>Добавить</button>
      <button onClick={decrement}>Убавить</button>
    </div>
  );
};

export default Counter;
