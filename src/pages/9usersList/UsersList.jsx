import React, { useState, useEffect } from "react";
import userCards from "../../components/cards/userCards"; // Импорт массива пользователей из userCards.js
import styles from "./UsersList.module.css";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersJson = async () => {
      try {
        // 1. Получаем данные из users.json
        const response = await fetch("http://localhost:3002/users");
        const usersFromJson = await response.json();

        // 2. Объединяем данные из users.json и userCards.js
        const allUsers = [...usersFromJson, ...userCards];
        setUsers(allUsers); // Обновляем состояние с объединённым массивом
      } catch (error) {
        console.error("Ошибка получения данных из users.json:", error);
      }
    };

    fetchUsersJson();
  }, []);

  return (
    <div className={styles.usersContainer}>
      <h1>Список пользователей</h1>
      <table className={styles.usersTable}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Телефон</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}> {/* Используем id как уникальный ключ */}
              <td>{user.email || "Не указан"}</td>
              <td>{user.phone || "Не указан"}</td>
              <td>{user.address || "Не указан"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
