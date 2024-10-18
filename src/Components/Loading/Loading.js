//Модули
import React, {useEffect, useState} from "react";
// Компоненты
// Стили
import "./Loading.css"; // Подключите CSS файл для стилей

const Loading = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "")); // Изменяем количество точек
    }, 500); // Измените скорость, если нужно

    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, []);

  return (
    <section className="download__container">
      <h2>Загрузка{dots}</h2>
    </section>
  );
};

export default Loading;
