import React from 'react';
import { useBasket } from '../../../components/context/BasketContext';
import BasketItem from '../basketItem/BasketItem';
import styles from './BasketList.module.css';

function BasketList() {
  const { basket, removeFromBasket } = useBasket(); // Извлекаем корзину и функцию удаления из контекста

  // Расчёт общей суммы
  const calculateT = () => {
    return basket.reduce((total, product) => {
      const numericPrix = parseFloat(product.Prix) || 0;
      const numericNprix = parseFloat(product.Nprix) || numericPrix;
      return total + numericNprix * (product.quantity || 1); // Используем глобальное состояние 'quantity'
    }, 0);
  };
  
  

  return (
    <>
      <div className={styles.grid31}>
        {basket.map((product) => (
          <BasketItem
            key={product.id}
            id={product.id}
            photo={product.photo}
            Name={product.Name}
            Code={product.Code}
            Prix={product.Prix}
            Nprix={product.Nprix}
            onRemove={removeFromBasket} // Функция удаления
          />
        ))}
      </div>
      <div className={styles.grid32}>
        <div className={styles.grid321}>
          <h2>общая сумма</h2>
        </div>
        <div className={styles.grid322}>
          <h2>{calculateT()}₴</h2>
        </div>
        <div className={styles.grid323}>
          <h2>оплатить</h2>
        </div>
      </div>
    </>
  );
}

export default BasketList;

