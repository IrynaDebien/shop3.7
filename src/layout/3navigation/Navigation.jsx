import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '../../pages/1home/Home';
import ProductDetails from '../../pages/2product/ProductDetails';
import Basket from '../../pages/3bascket/Basket'; // Корзина
import NotFound from '../../pages/4notFound/NotFound';
import Register from '../../pages/5register/Register';
import Login from '../../pages/6login/Login';
import NewItem from '../../pages/7newItem/NewItem';
import MyAccount from '../../pages/8myAccount/MyAccount';
import UsersList from '../../pages/9usersList/UsersList';
import ChangesItem from '../../pages/10changesItem/ChangesItem';


// Массив маршрутов
const routes = [
  { path: '/', element: <Home /> }, // Главная страница
  { path: '/product/:id', element: <ProductDetails /> }, // Динамическая страница товара
  { path: '/basket', element: <Basket /> }, // Страница корзины
  { path: '*', element: <NotFound /> }, // Страница "404"
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login/> },
  { path: '/newItem', element: <NewItem /> },
  { path: '/myAccount', element: <MyAccount /> },
  { path: '/usersList', element: <UsersList /> },
  { path: '/changesItem/:id', element: <ChangesItem /> }  // Динамическая страница товара

];

function Navigation() {
  const routing = useRoutes(routes); // useRoutes для обработки маршрутов
  return <div className="grid">{routing}</div>; // Рендер контента маршрутов
}

export default Navigation;
