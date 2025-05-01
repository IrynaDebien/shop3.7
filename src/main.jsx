import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BasketProvider } from './components/context/BasketContext.jsx'; // Импортируем провайдер корзины
import { UserProvider } from './components/context/UserContext'; // Импортируем UserProvider
import { ItemProvider } from './components/context/ItemContext'; // Импортируем ItemProvider
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BasketProvider>
      <UserProvider> {/* UserProvider оборачивает всё приложение */}
        <ItemProvider> {/* Подключаем ItemProvider */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ItemProvider>
      </UserProvider>
    </BasketProvider>
  </StrictMode>,
);
