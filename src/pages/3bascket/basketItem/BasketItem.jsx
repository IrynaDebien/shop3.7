import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BasketItem.module.css';
import ligne1 from '/src/assets/images/ligne4.png';
import pubImage from '/src/assets/images/pub.png';
import { useBasket } from '../../../components/context/BasketContext';
function BasketItem({ id, photo, Name, Code, Prix, Nprix, onRemove }) {
  const { updateQuantity, basket } = useBasket(); // Получаем функцию и состояние из контекста
  const item = basket.find((product) => product.id === id); // Находим товар в корзине

  // Увеличение количества товара
  const increment = () => {
    updateQuantity(id, (item.quantity || 1) + 1); // Обновляем количество
  };

  // Уменьшение количества товара
  const decrement = () => {
    if (item.quantity > 1) {
      updateQuantity(id, item.quantity - 1); // Обновляем количество
    }
  };

  // Расчёт общей стоимости
  const calculateTotal = (Nprix, Prix, quantity) => {
    const numericPrix = parseFloat(Prix) || 0;
    const numericNprix = parseFloat(Nprix) || numericPrix;
    return (numericNprix || numericPrix) * quantity;
  };

  return (
    <div className={styles.grid31}>
      <div className={styles.grid311}>
        <NavLink to={`/product/${id}`} className={styles.productLink}>
          <div className={styles.grid311}>
            <img className={styles.photo} src={photo} alt={Name} />
          </div>
        </NavLink>
      </div>
      <div className={styles.grid312}>
        <NavLink to={`/product/${id}`} className={styles.productLink}>
          <div className={styles.grid312}>
            <h2>{Name}</h2>
          </div>
        </NavLink>
      </div>
      <div className={styles.grid313}>
        <NavLink to={`/product/${id}`} className={styles.productLink}>
          <div className={styles.grid313}>
            <p>{Code}</p>
          </div>
        </NavLink>
      </div>
      <div className={styles.grid314}>
        <h2>{Prix}</h2>
        {Nprix && (
          <img
            className={styles.overlayLine}
            src={ligne1}
            alt="Line"
          />
        )}
      </div>
      <div className={styles.grid315}>
        <h2>{Nprix}</h2>
      </div>
      <div className={styles.grid316}>
        <button className={styles.button1} onClick={decrement}>-</button>
        <div className={styles.number}>{ item.quantity || 1}</div>
        <button className={styles.button3} onClick={increment}>+</button>
      </div>
      <div className={styles.grid317}>
        <h2>{calculateTotal(Nprix, Prix, item.quantity || 1)}</h2>
      </div>
      <div className={styles.grid318}>
        {/* Добавляем удаление товара из корзины */}
        <img
          className={styles.pubImage}
          src={pubImage}
          alt="Trash Can"
          onClick={() => onRemove(id)} // Вызываем функцию onRemove с id товара
        />
      </div>
    </div>
  );
}

export default BasketItem;
