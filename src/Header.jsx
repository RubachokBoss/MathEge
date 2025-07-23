import React, { useState, useEffect } from 'react';
import './Header.css';
import { FaBook, FaUser, FaLifeRing, FaSun, FaMoon } from 'react-icons/fa';

export default function Header() {
  const [dark, setDark] = useState(false);

  // применяем класс 'dark' к <body>
  useEffect(() => {
    const root = document.body;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  const tasks = Array.from({ length: 19 }, (_, i) => `Задание ${i + 1}`);
  const profileItems = ['Данные', 'Настройки', 'Выход'];

  return (
    <header className="header">
      <div className="logo">
        EGE <span className="logo-plus">+</span>
      </div>

      <nav className="nav">
        <ul className="menu">
          <li className="menu-item">
            <button className="menu-button">
              <FaBook className="icon" /> Каталог
            </button>
            <ul className="submenu">
              {tasks.map(task => (
                <li key={task} className="submenu-item"><a href="#">{task}</a></li>
              ))}
            </ul>
          </li>

          <li className="menu-item">
            <button className="menu-button">
              <FaUser className="icon" /> Профиль
            </button>
            <ul className="submenu">
              {profileItems.map(item => (
                <li key={item} className="submenu-item"><a href="#">{item}</a></li>
              ))}
            </ul>
          </li>

          <li className="menu-item">
            <button className="menu-button">
              <FaLifeRing className="icon" /> Поддержка
            </button>
            <ul className="submenu">
              <li className="submenu-item"><a href="#">Чат поддержки</a></li>
              <li className="submenu-item"><a href="mailto:support@egeinfo.ru">support@egeinfo.ru</a></li>
              <li className="submenu-item"><a href="tel:+71234567890">+7 123 456‑78‑90</a></li>
            </ul>
          </li>
        </ul>
      </nav>

      <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Переключить тему">
        {dark ? <FaSun /> : <FaMoon />}
      </button>
    </header>
  );
}