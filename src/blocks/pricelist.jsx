import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './pricelist.css';

const PLANS = [
  {
    id: 0,
    title: 'Чайник',
    subtitle: 'до 80 баллов',
    price: '2 990₽ / мес',
    accent: '#f6ad55',
    features: [
      'Короткие ролики 2–5 мин',
      'База + разборы самых частых ошибок',
      'Домашки с автопроверкой',
      'Чат-бот-помощник'
    ]
  },
  {
    id: 1,
    title: 'Хорошист',
    subtitle: 'до 90 баллов',
    price: '4 990₽ / мес',
    accent: '#38b2ac',
    features: [
      'Все из «Чайника»',
      'Углублённые файлы-«шпаргалки»',
      'Челленджи на скорость / логику',
      'Разбор реальных вариантов 2023–2024'
    ]
  },
  {
    id: 2,
    title: 'Отличник',
    subtitle: 'до 100 баллов',
    price: '7 990₽ / мес',
    accent: '#805ad5',
    features: [
      'Все из «Хорошиста»',
      'Личные мит-ревью со срезом слабых мест',
      'Тренажёры 18–19 заданий',
      'Персональный план до ЕГЭ'
    ]
  }
];

export default function PricingSection() {
  const [active, setActive] = useState(1);

  const goPrev = () => setActive(a => (a - 1 + PLANS.length) % PLANS.length);
  const goNext = () => setActive(a => (a + 1) % PLANS.length);

  const calcCardState = (i) => {
    const offset = i - active;
    // замыкаем по кругу (чтобы 0 был «справа» от 2 и т.д.)
    const length = PLANS.length;
    let shortest = offset;
    if (offset > length / 2) shortest = offset - length;
    if (offset < -length / 2) shortest = offset + length;

    const depth = Math.abs(shortest);
    const scale = 1 - depth * 0.06;
    const x = shortest * 60;
    const rotate = shortest * -5;
    const zIndex = length - depth;
    const opacity = depth > 2 ? 0 : 1;

    return { x, scale, rotate, zIndex, opacity, isActive: shortest === 0 };
  };

  const stack = useMemo(() => PLANS.map((p, i) => ({ ...p, ...calcCardState(i) })), [active]);

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-header">
        <h2>Выбери свой буст к баллам</h2>
        <p>Цветовая палитра и стиль — в духе твоего сайта</p>
      </div>

      <div className="stack-wrapper">
        <button className="nav-btn prev" onClick={goPrev} aria-label="предыдущий тариф">‹</button>

        <div className="stack">
          {stack.map((plan) => (
            <motion.article
              key={plan.id}
              className="card"
              style={{ zIndex: plan.zIndex }}
              animate={{
                x: plan.x,
                scale: plan.scale,
                rotateZ: plan.rotate,
                opacity: plan.opacity
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              onClick={() => setActive(plan.id)}
            >
              <header className="card-head">
                <h3 style={{ color: plan.accent }}>{plan.title}</h3>
                <span className="subtitle">{plan.subtitle}</span>
                <div className="price">{plan.price}</div>
              </header>

              <AnimatePresence initial={false}>
                {plan.isActive && (
                  <motion.div
                    className="card-body"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ul className="features">
                      {plan.features.map((f, idx) => (
                        <li key={idx}>✔ {f}</li>
                      ))}
                    </ul>
                    <button className="buy-btn" style={{ background: plan.accent }}>
                      Оформить
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>

        <button className="nav-btn next" onClick={goNext} aria-label="следующий тариф">›</button>
      </div>

      <div className="dots">
        {PLANS.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`переключиться на тариф ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
