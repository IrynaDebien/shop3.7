import React, { useState, useContext } from 'react';
import { UserContext } from '../../components/context/UserContext';
import { useBasket } from '../../components/context/BasketContext'; // Импортируем BasketContext
import styles from './Login.module.css';

function Login() {
  const { loginUser } = useContext(UserContext); // Используем функцию loginUser из UserContext
  const { login } = useBasket(); // Импортируем login из BasketContext для загрузки корзины
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const user = await loginUser(email, password); // Вход через UserContext
      login(user); // Вызываем login из BasketContext, чтобы загрузить корзину текущего пользователя
      setMessage("Вход выполнен успешно!");
    } catch (error) {
      console.error("Ошибка входа:", error);
      setMessage("Ошибка входа. Проверьте данные.");
    }

    // Скрываем сообщение через 3 секунды
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className={styles.grid31}>
      <h1>Вход</h1>
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
        <div className={styles.grid31button}>
          <button type="submit">Войти</button>
        </div>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export default Login;
