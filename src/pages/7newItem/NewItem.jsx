import React, { useState } from 'react';
import styles from './NewItem.module.css'; // Стили для страницы

function NewItem() {
  const [newItem, setNewItem] = useState({
    id: '',
    Name: '',
    Code: '',
    Prix: '',
    Nprix: '',
    Description: '',
    photo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Валидация пути к изображению
    if (!newItem.photo.startsWith('/assets/') && 
        !newItem.photo.startsWith('http://') && 
        !newItem.photo.startsWith('https://')) {
      alert('Пожалуйста, введите корректную ссылку на изображение.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/shopCards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // ID как строка, чтобы соответствовать вашему db.json
        body: JSON.stringify({ ...newItem, id: String(Date.now()) }),
      });
  
      if (response.ok) {
        alert('Новый товар успешно добавлен!');
        setNewItem({
          id: '',
          Name: '',
          Code: '',
          Prix: '',
          Nprix: '',
          Description: '',
          photo: '',
        });
      } else {
        alert('Произошла ошибка при добавлении товара.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Не удалось подключиться к серверу.');
    }
  };
  
  

  return (
    <div className={styles.grid31}>
      <div className={styles.grid31h1}>
        <h2>Новый товар</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
            <input
              type="text"
              name="Name"
              value={newItem.Name}
              onChange={handleChange}
              placeholder="Название товара"
              required
            />
        </label>
        <label>
            <input
              type="text"
              name="Code"
              value={newItem.Code}
              onChange={handleChange}
              placeholder="Код товара"
            />
        </label>
        <label>
          <input
            type="text"
            name="Prix"
            value={newItem.Prix}
            onChange={handleChange}
            placeholder="Цена"
            required
          />
        </label>
        <label>
          <input
            type="text"
            name="Nprix"
            value={newItem.Nprix}
            onChange={handleChange}
            placeholder="Цена со скидкой"
          />
        </label>
        <label>
          <div className={styles.grid311}>
            <textarea
              name="Description"
              value={newItem.Description}
              onChange={handleChange}
              placeholder="Введите описание товара"
              required
            />
          </div>
        </label>
        <label>
          <input
            type="text"
            name="photo"
            value={newItem.photo}
            onChange={handleChange}
            placeholder="Ссылка на изображение"
          />
        </label>
        <div className={styles.grid312}>
          <button type="submit">Добавить</button>
        </div>
      </form>
    </div>
  );
}

export default NewItem;
