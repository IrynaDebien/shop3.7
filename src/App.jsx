import React, { useEffect } from 'react'; 
import styles from './App.module.css';
import Header from './layout/1header/Header';
import Aside from './layout/2aside/Aside';
import Navigation from './layout/3navigation/Navigation';
import Footer from './layout/4footer/Footer';


function App() {
  useEffect(() => {
    window.onbeforeunload = () => {
      localStorage.clear(); // Очищаем Local Storage при закрытии сайта
    };
  }, []);

  return (
    <div className={styles.grid}>
      <div className={styles.grid1}><Header /></div>
      <div className={styles.grid2}><Aside /></div>
      <div className={styles.grid3}><Navigation /> {/* Маршрутизация через Navigation */}</div>
      <div className={styles.grid4}><Footer /></div>
    </div>
  );
}

export default App;
