import React, { useState, useRef, useEffect } from 'react';
import './Header.css';

function Header() {
    const [openMenu, setOpenMenu] = useState('');
    const navRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setOpenMenu('');
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const toggleMenu = (menu) => {
        setOpenMenu(prev => (prev === menu ? '' : menu));
    };

    const tasks = Array.from({ length: 19 }, (_, i) => `Задание ${i + 1}`);
    const profileItems = ['Данные', 'Настройки', 'Выход'];

    return (
        <header className="header">
            <div className="logo">ЕГЭ Информатика</div>
            <nav className="nav" ref={navRef}>
                <div className="menu-item">
                    <button className="menu-button" onClick={() => toggleMenu('catalog')}>Каталог</button>
                    <ul className={`submenu ${openMenu === 'catalog' ? 'open' : ''}`}>
                        {tasks.map(task => (
                            <li key={task}><a href="#">{task}</a></li>
                        ))}
                    </ul>
                </div>
                <div className="menu-item">
                    <button className="menu-button" onClick={() => toggleMenu('profile')}>Профиль</button>
                    <ul className={`submenu ${openMenu === 'profile' ? 'open' : ''}`}>
                        {profileItems.map(item => (
                            <li key={item}><a href="#">{item}</a></li>
                        ))}
                    </ul>
                </div>
                <div className="menu-item">
                    <button className="menu-button" onClick={() => toggleMenu('support')}>Поддержка</button>
                    <ul className={`submenu ${openMenu === 'support' ? 'open' : ''}`}>
                        <li><a href="#">Чат поддержки</a></li>
                        <li><a href="mailto:support@egeinfo.ru">support@egeinfo.ru</a></li>
                        <li><a href="tel:+71234567890">+7 123 456-78-90</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;