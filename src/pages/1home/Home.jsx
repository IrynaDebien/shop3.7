import React from 'react';
import ShopList from './shop/shopList/ShopList'; // Импорт компонента списка товаров
import styles from './Home.module.css'; // Импорт модульных стилей

function Home() {
  return (
    <div className={styles.home}>
      <ShopList /> {/* Отображение списка товаров */}
    </div>
  );
}

export default Home;

