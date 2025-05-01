import React, { useContext } from 'react';
import { UserContext } from '../../components/context/UserContext';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import styles from './Header.module.css';

function Header() {
  const { userEmail, role, logoutUser } = useContext(UserContext);
  const navigate = useNavigate(); // Используем useNavigate для перенаправления
  
  // Функция для отображения статуса пользователя
  const renderUserStatus = () => {
    if (role === 'guest') return 'Гость';
    if (role === 'admin') return 'Администратор';
    return userEmail || 'Неизвестный пользователь'; // Обрабатываем случай пустого userEmail
  };

  // Обновляем логику выхода, чтобы перенаправлять на главную страницу
  const handleLogout = () => {
    logoutUser(); // Вызываем функцию выхода из UserContext
    navigate('/'); // Перенаправляем на главную страницу
  };

  return (
    <div className={styles.grid1}>
      {/* Логотип или значок магазина */}
      <div className={styles.grid11}>店</div>
      
      {/* Приветственное сообщение */}
      <div className={styles.grid12}>
        <h1 className={styles.title}>Добро пожаловать в наш магазин!</h1>
      </div>
      
      {/* Панель статуса пользователя */}
      <div className={styles.grid13}>
        <div className={styles.grid131}>
          <p className={styles.userStatus}>
            {renderUserStatus()}
          </p>
        </div>
        
        {/* Кнопка "Выйти" отображается только для admin и user */}
        {role !== 'guest' && (
          <div className={styles.grid132}>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Выйти
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
