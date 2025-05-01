import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../components/context/UserContext'; // Импортируем UserContext
import styles from './Aside.module.css'; // Подключение модульных стилей

function Aside() {
  const { role } = useContext(UserContext); // Получаем роль пользователя из контекста

  return (
    <div className={styles.grid2}>
      <div className={styles.grid21}>Содержание</div>
      <ul>
        {/* Кнопка "Магазин" доступна всем */}
        <li>
          <div className={styles.grid22}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Магазин
            </NavLink>
          </div>
        </li>
        {/* Кнопка "Корзина" доступна только пользователю */}
        {role === 'user' && (
          <li>
            <div className={styles.grid23}>
              <NavLink
                to="/basket"
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
              >
                Корзина
              </NavLink>
            </div>
          </li>
        )}
        {/* Кнопка "Регистрация кабинета" доступна всем */}
        {role === 'guest' && ( // Кнопка регистрации доступна только гостям
          <li>
            <div className={styles.grid24}>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
              >
                Регистрация кабинета
              </NavLink>
            </div>
          </li>
        )}
        {/* Кнопка "Войти в свой кабинет" доступна только гостям */}
        {role === 'guest' && ( // Кнопка входа видна только гостям
          <li>
            <div className={styles.grid25}>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
              >
                Войти в свой кабинет
              </NavLink>
            </div>
          </li>
        )}
        {/* Кнопка "Добавить товар" доступна только администратору */}
        {role === 'admin' && (
          <li>
            <div className={styles.grid26}>
              <NavLink
                to="/newItem"
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
              >
                Добавить товар
              </NavLink>
            </div>
          </li>
        )}
        {/* Кнопка "Мой кабинет" доступна пользователю и администратору */}
        {(role === 'user' || role === 'admin') && (
          <li>
            <div className={styles.grid27}>
              <NavLink
                to="/myAccount"
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
              >
                Мой кабинет
              </NavLink>
            </div>
          </li>
        )}
        {/* Кнопка "Список покупателей" доступна только администратору */}
        {role === 'admin' && (
          <li>
            <div className={styles.grid28}>
              <NavLink
                to="/usersList"
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
              >
                Список покупателей
              </NavLink>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Aside;
