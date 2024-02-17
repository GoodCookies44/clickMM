// Модули
import React, {createContext, useState, useEffect} from "react";
import PropTypes from "prop-types";

export const CounterContext = createContext();

export const CounterProvider = ({children}) => {
  // Загружаем данные из локального хранилища при загрузке компонента
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
    setCounters((prevCounters) => {
      // Обновление значения счётчика
      return prevCounters.map((counter) => (counter.id === id ? {...counter, value} : counter));
    });
  };

  // Сохраняем данные в локальное хранилище при изменении counters
  useEffect(() => {
    localStorage.setItem("counters", JSON.stringify(counters));
  }, [counters]);

  return (
    <CounterContext.Provider value={{counters, addCounterId, updateCounterValue}}>
      {children}
    </CounterContext.Provider>
  );
};

CounterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
