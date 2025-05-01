import React, { useState } from 'react';
import userCards from "../../components/cards/userCards";

import styles from './Register.module.css';

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Проверяем, пуст ли массив userCards.js
      console.log("Проверка пустоты userCards.js...");
      const isUserCardsEmpty = userCards.length === 0;
    
      // 2. Проверяем, пуст ли массив users.json
      console.log("Проверка пустоты users.json...");
      const response = await fetch("http://localhost:3002/users");
      const users = await response.json();
      const isUsersEmpty = users.length === 0;
    
      // 3. Если оба источника пусты, определяем роль "admin"
      const role = (isUserCardsEmpty && isUsersEmpty) ? "admin" : "user";
    
      const newUser = { ...formData, id: Date.now().toString(), role };
    
      // 4. Сохраняем нового пользователя в users.json
      const postResponse = await fetch("http://localhost:3002/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
    
      if (!postResponse.ok) {
        setMessage("Ошибка регистрации пользователя.");
        return;
      }
    
      // 5. Создаём пустую корзину для пользователя в baskets.json
      const basketResponse = await fetch(`http://localhost:3003/baskets`, { 
        method: "POST", // Используем POST для создания новой корзины
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: newUser.id, items: [] }), // Оборачиваем корзину в объект
      });      
    
      if (!basketResponse.ok) {
        setMessage("Ошибка создания корзины пользователя.");
        return;
      }
    
      // 6. Если всё прошло успешно
      setMessage("Регистрация прошла успешно!");
      setFormData({ email: "", password: "", phone: "", address: "" });
    } catch (error) {
      console.error("Ошибка:", error);
      setMessage("Ошибка подключения к серверу.");
    }
    
    setTimeout(() => setMessage(""), 3000); // Очистка сообщения
  };
  

  return (
    <div className={styles.grid31}>
      <h1>Регистрация</h1>
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
            type="password"
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
          <button type="submit">Зарегистрироваться</button>
        </div>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export default Register;
