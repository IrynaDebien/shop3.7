import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBasket } from '../../components/context/BasketContext.jsx';
import { UserContext } from '../../components/context/UserContext';
import styles from './ProductDetails.module.css';

function ProductDetails() {
  const { id } = useParams(); // Получаем ID товара из URL
  const navigate = useNavigate();
  const { basket, addToBasket } = useBasket();
  const { userEmail, role } = useContext(UserContext); // Добавляем роль пользователя
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Используем ID из URL как строку без преобразования
        console.log('Ищем товар с ID:', id);
  
        // Делаем запрос к серверу
        const response = await fetch(`http://localhost:3001/shopCards/${id}`);
        
        // Проверка успешности ответа
        if (!response.ok) {
          throw new Error(`Ошибка: товар с ID ${id} не найден`);
        }
  
        // Обработка данных
        const data = await response.json();
        console.log('Полученные данные:', data);
        setProduct(data);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setProduct(null); // Устанавливаем null, если ошибка
      }
    };
  
    fetchProduct();
  }, [id]); // Запрос выполняется при изменении ID
  

  // Если товар не найден
  if (!product) {
    return <div>Товар с ID {id} не найден</div>;
  }

  // Обработка добавления товара в корзину
  const handleAddToBasket = () => {
    if (userEmail === 'Гость') {
      setMessage('Вы не вошли в свой кабинет!');
    } else {
      const existingItem = basket.find((item) => item.id === product.id);
      if (existingItem) {
        setMessage('Такой товар уже в корзине');
      } else {
        addToBasket(product);
        setMessage('Товар добавлен в корзину');
        navigate('/basket'); // Перенаправление в корзину
      }
    }
    setTimeout(() => setMessage(''), 2000);
  };

  // Обработка изменения свойств товара
  const handleEditProduct = () => {
    navigate(`/changesItem/${id}`); // Перенаправление на страницу изменения товара
  };

  return (
    <div className={styles.grid31}>
      <div className={styles.grid311}>
        <img src={product.photo} alt={product.Name} />
      </div>
      <div className={styles.grid312}>
        <h1>{product.Name}</h1>
        <p>{product.Description}</p>
        <p>Цена: {product.Prix}</p>
        {product.Nprix && <p>Цена со скидкой: {product.Nprix}</p>}
      </div>
      <div className={styles.grid313}>
        {/* Если роль администратора, показываем кнопку "Изменить свойства товара" */}
        {role === 'admin' ? (
          <button onClick={handleEditProduct} className={styles.editButton}>
            Изменить свойства товара
          </button>
        ) : (
          // Если пользователь, показываем кнопку "Добавить в корзину"
          <button onClick={handleAddToBasket} className={styles.addButton}>
            Добавить в корзину
          </button>
        )}
      </div>
      {message && <div className={styles.notification}>{message}</div>}
    </div>
  );
}

export default ProductDetails;
