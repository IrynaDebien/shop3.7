import React from 'react';
import styles from './Footer.module.css'; // Импорт модульных стилей

function Footer() {
    return (
        <div className={styles.grid4}> {/* Использование стиля через объект styles */}
            <div className={styles.grid41}></div>
            <div className={styles.grid42}></div>
            <div className={styles.grid43}>
                Франция 2025 год
            </div>
        </div>
    );
}

export default Footer;

