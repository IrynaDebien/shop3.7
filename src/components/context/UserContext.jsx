import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("Гость");
  const [role, setRole] = useState("guest");

  const loginUser = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3002/users"); // Эндпоинт на сервере users.json
      const users = await response.json();

      // Находим пользователя по email и паролю
      const user = users.find((u) => u.email === email && u.password === password);

      if (!user) {
        throw new Error("Неверный email или пароль."); // Выбрасываем ошибку, если пользователь не найден
      }

      console.log("Пользователь найден:", user); // Логируем найденного пользователя
      setUserEmail(user.email); // Устанавливаем email в контексте
      setRole(user.role);       // Устанавливаем роль пользователя
      localStorage.setItem("currentUser", JSON.stringify(user)); // Сохраняем весь объект пользователя
      return user; // Возвращаем объект пользователя, включая id
    } catch (error) {
      console.error("Ошибка входа:", error);
      throw error; // Передаём ошибку дальше
    }
  };

  const logoutUser = () => {
    setUserEmail("Гость");
    setRole("guest");
    localStorage.removeItem("currentUser"); // Удаляем данные при выходе
  };

  // Очистка данных из localStorage при закрытии сайта
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("currentUser"); // Очищаем данные при закрытии вкладки/сайта
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <UserContext.Provider value={{ userEmail, role, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
