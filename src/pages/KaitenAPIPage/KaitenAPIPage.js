// Модули
import React, {useEffect, useState} from "react";
import axios from "axios";
// Стили
import "./KaitenAPIPage.css";

export default function KaitenAPIPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Функция для получения данных из Google Таблицы
  const fetchReportData = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbx4WX6F5LJ4ov1F4Yapvtp-Pn08MoWSHi2vApULoRZGwOUMacVhDff4LMres8IYAfUt/exec"
      );
      const data = await response.json();
      setUsers(data.users); // Сохраняем полученные данные в состояние
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setLoading(false);
    }
  };

  // Функция для создания карточки в Kaiten
  const createCardInKaiten = async (user) => {
    const options = {
      method: "POST",
      url: "https://magnit-market.kaiten.ru/api/latest/cards",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer e473be60-0310-40c1-b3c4-ef472646bed5", // Ваш токен
      },
      data: {
        title: user.Title, // Используем данные пользователя
        board_id: 1058610, // Замените на нужный board_id
        description: user.Description, // Используем описание
        position: 2,
      },
    };

    console.log("Отправляем запрос:", options); // Лог запроса

    try {
      const response = await axios.request(options);
      console.log("Card created:", response.data);
      alert("Карточка успешно создана!"); // Уведомление об успешном создании
    } catch (error) {
      console.error("Ошибка при создании карточки:", error.response?.data || error.message);
      alert("Ошибка при создании карточки!");
    }
  };

  // Вызов функции для получения данных при монтировании компонента
  useEffect(() => {
    fetchReportData();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>; // Показать загрузку, пока данные получаются
  }

  return (
    <div className="kaiten-api-page">
      <h1>Полученные данные</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <h2>{user.Title}</h2>
            <p>{user.Description}</p>
            <button onClick={() => createCardInKaiten(user)}>Создать карточку</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
