import React from 'react';
import BasketList from './basketList/BasketList'; // Используем компонент ProductList
import styles from './Basket.module.css'; // Подключаем стили

function Basket() {
  return (
    <div className={styles.basket}>
      <BasketList isHome={false} /> {/* Список товаров для корзины */}
    </div>
  );
}

export default Basket;
