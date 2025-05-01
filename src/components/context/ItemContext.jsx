import React, { createContext, useState, useEffect } from "react";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Загружаем товары из db.json
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3001/shopCards");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
      }
    };
    fetchItems();
  }, []);

  // Функция для удаления товара
  const deleteItem = async (id) => {
    try {
      await fetch(`http://localhost:3001/shopCards/${id}`, { // Исправленный путь
        method: "DELETE",
      });
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Ошибка удаления товара:", error);
    }
  };

  return (
    <ItemContext.Provider value={{ items, deleteItem }}>
      {children}
    </ItemContext.Provider>
  );
};
