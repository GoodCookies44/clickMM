import React, {useState, useEffect} from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // При монтировании компонента восстанавливаем значение из хранилища
    chrome.storage.local.get(["count"], (result) => {
      if (result.count !== undefined) {
        setCount(result.count);
      }
    });

    // Вешаем обработчик на событие закрытия расширения
    window.addEventListener("beforeunload", () => {
      // Сохраняем значение в хранилище перед выгрузкой
      chrome.storage.local.set({count});
    });

    return () => {
      // Убираем обработчик перед размонтированием компонента
      window.removeEventListener("beforeunload", () => {
        chrome.storage.local.set({count});
      });
    };
  }, [count]);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <h1>Counter Extension</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;
