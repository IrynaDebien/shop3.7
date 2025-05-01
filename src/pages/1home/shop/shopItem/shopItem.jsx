import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useBasket } from "../../../../components/context/BasketContext.jsx"; // Контекст корзины
import { UserContext } from "../../../../components/context/UserContext"; // Контекст пользователя
import { ItemContext } from "../../../../components/context/ItemContext"; // Контекст товаров
import styles from "./ShopItem.module.css";
import ligne1 from "../../../../assets/images/ligne4.png";

function ShopItem({ id, photo, Name, Prix, Nprix }) {
  const { addToBasket } = useBasket(); // Функция добавления в корзину
  const { userEmail, role } = useContext(UserContext); // Получаем email и роль пользователя
  const { deleteItem } = useContext(ItemContext); // Функция удаления товара
  const [notification, setNotification] = useState(""); // Для сообщений

  // Функция для обработки клика по кнопке добавления в корзину
  const handleAddToBasket = () => {
    if (userEmail === "Гость") {
      setNotification("Вы не вошли в свой кабинет!");
    } else {
      const item = { id, photo, Name, Prix, Nprix };
      addToBasket(item); // Добавляем товар в корзину
      setNotification(`${Name} добавлен в корзину!`);
    }
    setTimeout(() => setNotification(""), 2000);
  };

  // Функция для обработки клика по кнопке удаления товара
  const handleDeleteItem = async () => {
    try {
      await deleteItem(id); // Удаляем товар через функцию из ItemContext
      setNotification(`${Name} удалён из магазина!`);
    } catch (error) {
      setNotification("Ошибка удаления товара.");
    }
    setTimeout(() => setNotification(""), 2000);
  };

  return (
    <div className={styles.grid31}>
      <div className={styles.grid311}>
        <NavLink to={`/product/${id}`} className={styles.productLink}>
          <img className={styles.photo} src={photo} alt={Name} />
        </NavLink>
      </div>
      <div className={styles.grid312}>
        <NavLink to={`/product/${id}`} className={styles.productLink}>
          <h2>{Name}</h2>
        </NavLink>
      </div>
      <div className={styles.grid314}>
        <h2>{Prix}</h2>
        {Nprix && (
          <img
            className={styles.overlayLine}
            src={ligne1}
            alt="Line indicating old price"
          />
        )}
      </div>
      <div className={styles.grid315}>
        <h2>{Nprix}</h2>
      </div>
      <div className={styles.grid319}>
        {/* Если пользователь администратор, показываем кнопку "Удалить товар" */}
        {role === "admin" ? (
          <button onClick={handleDeleteItem} className={styles.deleteButton}>
            <div className={styles.buttonContent}>
              <h2>Удалить товар</h2>
            </div>
          </button>
        ) : (
          // Иначе показываем кнопку "Добавить в корзину"
          <button onClick={handleAddToBasket} className={styles.addButton}>
            <div className={styles.buttonContent}>
              <h2>добавить в корзину</h2>
            </div>
          </button>
        )}
      </div>
      <div className={styles.grid3191}>
        {notification && <div className={styles.notification}>{notification}</div>}
      </div>
    </div>
  );
}

export default ShopItem;

