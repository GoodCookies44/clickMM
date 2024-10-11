/* eslint-disable */
import React, {useEffect, useState} from "react";
import axios from "axios";
import "./KaitenAPIPage.css";

export default function KaitenAPIPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const spreadsheetId = "1keq2u2w8GqeqVaQwh2d1PdN7I7Hjn_26STu8OgrPk30"; // Замените на свой ID таблицы

  // Функция для получения данных из Google Sheets
  const fetchReportData = () => {
    chrome.runtime.sendMessage(
      {
        action: "fetchGoogleSheetsData",
        spreadsheetId: spreadsheetId,
      },
      (response) => {
        if (response.success) {
          const data = response.data;
          if (data && Array.isArray(data)) {
            const users = data.map((row) => ({
              Title: row[0] || "Без названия",
              Description: row[1] || "Нет описания",
            }));
            setUsers(users);
          } else {
            console.error("Данные не в ожидаемом формате:", response.data);
          }
        } else {
          console.error("Ошибка при получении данных:", response.error);
        }
        setLoading(false);
      }
    );
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
        title: user.Title,
        board_id: 1058610, // Замените на нужный board_id
        description: user.Description,
        position: 2,
      },
    };

    try {
      const response = await axios.request(options);
      console.log("Card created:", response.data);
      alert("Карточка успешно создана!");
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
    return <div className="kaiten-api-page">Загрузка...</div>;
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
/* eslint-enable */
