import React, {createContext, useState, useEffect} from "react";
import PropTypes from "prop-types";

export const CounterContext = createContext();

export const CounterProvider = ({children}) => {
  // Загружаем данные из локального хранилища при загрузке компонента
  const initialCounters = JSON.parse(localStorage.getItem("counters")) || [];
  const initialNotepadContent = localStorage.getItem("notepadContent") || "";
  const initialCategoryNames = JSON.parse(localStorage.getItem("categoryNames")) || {
    CategoryName_submit: "",
    CategoryName_accepted: "",
  };

  const [counters, setCounters] = useState(initialCounters);
  const [notepadContent, setNotepadContent] = useState(initialNotepadContent);
  const [categoryNames, setCategoryNames] = useState(initialCategoryNames);

  // Функция для добавления нового идентификатора счетчика
  const addCounterId = (id, dependencies) => {
    setCounters([...counters, {id, value: 0}]);
  };

  // Функция для обновления значения счетчика по его идентификатору
  const updateCounterValue = (id, value) => {
    setCounters((prevCounters) => {
      // Обновление значения счётчика
      return prevCounters.map((counter) => (counter.id === id ? {...counter, value} : counter));
    });
  };

  // Функция для сброса значений счетчиков по списку идентификаторов
  const resetCounters = (ids) => {
    // Сброс значений для счетчиков, чьи идентификаторы переданы в списке ids
    setCounters((prevCounters) =>
      prevCounters.map((counter) => (ids.includes(counter.id) ? {...counter, value: 0} : counter))
    );
  };

  // Функция для сохранения содержимого блокнота
  const saveNotepadContent = (content) => {
    setNotepadContent(content);
  };

  // Функция для обновления значений инпутов по их идентификаторам
  const updateCategoryName = (id, value) => {
    setCategoryNames((prevCategoryNames) => ({
      ...prevCategoryNames,
      [id]: value,
    }));
  };

  // Функция для удаления значений инпутов по их идентификаторам
  const resetCategoryName = (keys) => {
    keys.forEach((key) => {
      updateCategoryName(key, "");
    });
  };

  // Сохраняем данные в локальное хранилище при изменении counters или notepadContent
  useEffect(() => {
    localStorage.setItem("counters", JSON.stringify(counters));
  }, [counters]);

  useEffect(() => {
    localStorage.setItem("notepadContent", notepadContent);
  }, [notepadContent]);

  useEffect(() => {
    localStorage.setItem("categoryNames", JSON.stringify(categoryNames));
  }, [categoryNames]);

  return (
    <CounterContext.Provider
      value={{
        counters,
        notepadContent,
        categoryNames,
        addCounterId,
        updateCounterValue,
        resetCounters,
        saveNotepadContent,
        updateCategoryName,
        resetCategoryName,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};

CounterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
