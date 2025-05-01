import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from "./ChangesItem.module.css";

function ChangesItem() {
  const { id } = useParams(); // Получаем ID товара из URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('ID товара из URL:', id); // Проверяем ID
    // Запрашиваем данные товара с сервера
    fetch(`http://localhost:3001/shopCards/${id}`) // ID остаётся строкой
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка: товар с ID ${id} не найден`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Полученные данные:', data); // Для проверки
        setProduct(data); // Устанавливаем товар в состояние
        setUpdatedProduct(data); // Синхронизируем данные
      })
      .catch((error) => {
        console.error('Ошибка загрузки данных:', error);
        setMessage('Не удалось загрузить данные товара');
        setTimeout(() => setMessage(''), 3000);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangesItem = (e) => {
    e.preventDefault();

    // Фиксация текущей даты
    const updatedData = {
      ...updatedProduct,
      lastUpdated: new Date().toISOString(), // Сохраняем дату в ISO формате
    };

    fetch(`http://localhost:3001/shopCards/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка обновления товара');
        }
        return response.json();
      })
      .then(() => {
        setMessage('Товар успешно обновлён!');
        setTimeout(() => setMessage(''), 3000); // Скрываем сообщение через 3 секунды
        navigate(`/product/${id}`); // Перенаправляем на страницу товара
      })
      .catch((error) => {
        console.error('Ошибка обновления данных:', error);
        setMessage('Не удалось обновить товар');
        setTimeout(() => setMessage(''), 3000);
      });
  };

  if (!product) {
    return <div>Товар с ID {id} не найден</div>;
  }

  return (
    <div className={styles.grid31}>
      <div className={styles.grid311}>
        <img src={product.photo} alt={product.Name} />
      </div>
      <div className={styles.grid312}>
        <form onSubmit={handleChangesItem} className={styles.form}>
          <div className={styles.grid3121}>
            <label>
              <input
                type="text"
                name="Name"
                value={updatedProduct.Name || ''}
                onChange={handleChange}
                placeholder={updatedProduct.Name ? '' : 'Название:'}
                required
              />
            </label>
            <label>
              <input
                type="text"
                name="Code"
                value={updatedProduct.Code || 'Код:'}
                onFocus={(e) => {
                  if (e.target.value === 'Код:') e.target.value = '';
                }}
                onBlur={(e) => {
                  if (e.target.value === '') e.target.value = 'Код:';
                }}
                onChange={handleChange}
              />
            </label>
            <label>
              <input
                type="text"
                name="Prix"
                value={updatedProduct.Prix || ''}
                onChange={handleChange}
                placeholder={updatedProduct.Name ? '' : 'Цена'}
                required
              />
            </label>
            <label>
              <input
                type="text"
                name="Nprix"
                value={updatedProduct.Nprix || 'Цена со скидкой:'}
                onFocus={(e) => {
                  if (e.target.value === 'Цена со скидкой:') e.target.value = '';
                }}
                onBlur={(e) => {
                  if (e.target.value === '') e.target.value = 'Цена со скидкой:';
                }}
                onChange={handleChange}
              />
            </label>

            <label>
              <div className={styles.grid3121d}>
                <textarea
                  name="Description"
                  value={updatedProduct.Description || ''}
                  placeholder={updatedProduct.Name ? '' : 'Описание товара:'}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>
            <label>
              Изменить изображение:
              <input
                type="text"
                name="photo"
                value={updatedProduct.photo || ''}
                placeholder={updatedProduct.Name ? '' : 'Изменить изображение:'}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className={styles.grid3122}>
            <button className={styles.changesItem} type="submit">
              Изменить товар
            </button>
          </div>
        </form>
      </div>
      <div className={styles.grid313}>
        <p>
          Последнее изменение товара: <br></br>{product.lastUpdated 
            ? new Date(product.lastUpdated).toLocaleString() 
            : 'Данные отсутствуют'}
        </p>
      </div>
    </div>
  );
}

export default ChangesItem;
