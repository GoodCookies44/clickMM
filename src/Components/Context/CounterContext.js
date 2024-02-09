import React, {createContext, useState, useEffect} from "react";

export const CounterContext = createContext();

export const CounterProvider = ({children}) => {
  // Получаем данные из локального хранилища при загрузке страницы
  const initialCounters = JSON.parse(localStorage.getItem("counters")) || [];
  const [counters, setCounters] = useState(initialCounters);

  // Функция для добавления нового идентификатора счетчика
  const addCounterId = (id) => {
    if (!counters.some((counter) => counter.id === id)) {
      setCounters((prevCounters) => [...prevCounters, {id, value: 0}]);
    }
  };

  // Функция для обновления значения счетчика по его идентификатору
  const updateCounterValue = (id, value) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) => (counter.id === id ? {...counter, value} : counter))
    );
  };

  // Сохраняем данные в локальное хранилище при изменении counters
  useEffect(() => {
    console.log("Updating counters:", counters);
    localStorage.setItem("counters", JSON.stringify(counters));
  }, [counters]);

  return (
    <CounterContext.Provider value={{counters, addCounterId, updateCounterValue}}>
      {children}
    </CounterContext.Provider>
  );
};
