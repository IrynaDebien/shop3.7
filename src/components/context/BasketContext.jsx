import React, { createContext, useState, useContext, useEffect } from "react";
const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Текущий пользователь
  const [basket, setBasket] = useState([]); // Состояние корзины
  const [totalAmount, setTotalAmount] = useState(0); // Общая сумма корзины

  // Загрузка корзины для пользователя по id
  const loadBasketForUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3003/baskets/${id}`);
      if (!response.ok) {
        throw new Error("Корзина не найдена");
      }
      const data = await response.json();
      setBasket(data.items || []); // Устанавливаем товары корзины
    } catch (error) {
      console.error("Ошибка загрузки корзины:", error);
    }
  };

  // Сохранение корзины на сервере
  const saveBasketToServer = async () => {
    if (!currentUser) {
      console.error("Ошибка: текущий пользователь не установлен!");
      return;
    }
    try {
      console.log(`Сохранение корзины для пользователя с id: ${currentUser.id}`);
      await fetch(`http://localhost:3003/baskets/${currentUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: currentUser.id, items: basket }),
      });
    } catch (error) {
      console.error("Ошибка сохранения корзины:", error);
    }
  };

  // Добавление товара в корзину
  const addToBasket = (item) => {
    setBasket((prevBasket) => {
      const existingItem = prevBasket.find(
        (basketItem) => basketItem.id === item.id
      );
      if (existingItem) {
        return prevBasket; // Если товар уже есть, не добавляем
      } else {
        return [...prevBasket, { ...item, quantity: 1 }];
      }
    });
  };

  // Обновление количества товара
  const updateQuantity = (id, newQuantity) => {
    setBasket((prevBasket) =>
      prevBasket.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Удаление товара из корзины
  const removeFromBasket = (id) => {
    setBasket((prevBasket) => prevBasket.filter((item) => item.id !== id));
  };

  // Пересчёт общей суммы корзины
  const updateTotalAmount = () => {
    const total = basket.reduce((sum, product) => {
      const numericPrix = parseFloat(product.Prix) || 0;
      const numericNprix = parseFloat(product.Nprix) || numericPrix;
      return sum + numericNprix * (product.quantity || 1);
    }, 0);
    setTotalAmount(total);
  };

  // Загрузка корзины при входе пользователя
  const login = (user) => {
    setCurrentUser(user); // Устанавливаем текущего пользователя
    console.log(`Вход пользователя с id: ${user.id}`);
    loadBasketForUser(user.id); // Загружаем корзину
  };

  // Очистка корзины при выходе пользователя
  const logout = () => {
    setCurrentUser(null); // Сбрасываем текущего пользователя
    setBasket([]); // Очищаем корзину
  };

  // Сохранение корзины и пересчёт общей суммы при изменении корзины
  useEffect(() => {
    if (currentUser) {
      saveBasketToServer(); // Сохраняем корзину на сервере
    }
    updateTotalAmount(); // Пересчитываем общую сумму
  }, [basket]);

  return (
    <BasketContext.Provider
      value={{
        basket,
        totalAmount,
        addToBasket,
        updateQuantity,
        removeFromBasket,
        login,
        logout,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
