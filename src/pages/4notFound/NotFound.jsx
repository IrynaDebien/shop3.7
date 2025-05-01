import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NotFound.module.css'; // Импорт модульных стилей

function NotFound() {
  return (
    <div className={styles.notFoundPage}> {/* Основной контейнер */}
      <h1 className={styles.title}>404</h1> {/* Заголовок ошибки */}
      <p className={styles.message}>Извините, страница не найдена.</p>
      <NavLink to="/" className={styles.homeLink}>Вернуться на главную</NavLink>   {/* Ссылка на главную страницу */}
    </div>
  );
}

export default NotFound;
