import React, { useState, useEffect } from "react";
import styles from "./MyAccount.module.css";

function MyAccount() {
  const [formData, setFormData] = useState({
    id: "", // Инициализируем пустыми значениями
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  // Загрузка данных текущего пользователя из LocalStorage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("Текущий пользователь:", currentUser);
    if (currentUser) {
      setFormData(currentUser); // Устанавливаем данные текущего пользователя
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3002/users/${formData.id}`, {
        method: "PUT", // Используем PUT для полного обновления записи
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("Данные обновлены на сервере:", updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser)); // Обновляем данные в localStorage
        setMessage("Изменения успешно сохранены!");
      } else {
        console.error("Ошибка обновления данных на сервере:", response.statusText);
        setMessage("Ошибка сохранения данных!");
      }
    } catch (error) {
      console.error("Ошибка соединения с сервером:", error);
      setMessage("Ошибка соединения с сервером!");
    }

    // Очищаем сообщение через 3 секунды
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className={styles.grid31}>
      <h1>Мой кабинет</h1>
      <p>
        <strong>ID:</strong> {formData.id || "Нет данных"} (неизменяемый)
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Пароль:
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Телефон:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Адрес доставки:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <div className={styles.grid31button}>
          <button type="submit">Сохранить изменения</button>
        </div>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export default MyAccount;
