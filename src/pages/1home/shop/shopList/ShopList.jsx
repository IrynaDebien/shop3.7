import React, { useEffect, useState } from 'react';
import shopCards from '../../../../components/cards/shopCards'; // Импорт локальных данных
import ShopItem from '../shopItem/shopItem'; // Импорт компонента ShopItem
import styles from './ShopList.module.css';

function ShopList() {
  const [combinedShopCards, setCombinedShopCards] = useState([...shopCards]); // Инициализация локальными данными

  useEffect(() => {
    fetch('http://localhost:3001/shopCards') // Запрос к серверу
      .then((response) => response.json())
      .then((serverData) => {
        // Добавляем серверные данные к локальным
        const mergedData = [...shopCards];
        serverData.forEach((serverItem) => {
          let newId = serverItem.id;

          // Проверяем уникальность ID в объединённых данных
          while (mergedData.some((item) => item.id === newId)) {
            newId += 1; // Увеличиваем ID, если он уже существует
          }

          // Добавляем элемент с уникальным ID
          mergedData.push({ ...serverItem, id: newId });
        });

        setCombinedShopCards(mergedData); // Обновляем состояние
      })
      .catch((error) => console.error('Ошибка загрузки данных:', error)); // Обработка ошибок
  }, []); // useEffect вызывается один раз при загрузке компонента

  return (
    <div className={styles.grid31}>
      {combinedShopCards.map((product) => (
        <ShopItem
          key={product.id}
          id={product.id}
          photo={product.photo}
          Name={product.Name}
          Prix={product.Prix}
          Nprix={product.Nprix}
        />
      ))}
    </div>
  );
}

export default ShopList;

