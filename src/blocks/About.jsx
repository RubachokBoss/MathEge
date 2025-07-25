import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './sections.css'; // общий файл стилей для обоих блоков

export default function AboutZ() {
  const [open, setOpen] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const fade = {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const steps = [
    '∆ABN: AK — биссектриса и высота ⇒ AN = 6, NC = 3.',
    'В ∆ABC  BM:MC = 6:9 ⇒ MN = MC = NC = 3.',
    '∆MNC равнобедрен ⇒ биссектриса C делит MN пополам.',
    'В ∆PMN  PM = PN ⇒ AP : PN = 3 : 1.'
  ];

  return (
    <section ref={ref} className="section-block section-block--about">
      <motion.div
        className="about-grid-3"
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={{ hidden:{}, show:{ transition:{ staggerChildren: 0.2 } } }}
      >
        {/* 1) ЛЕВО: условие + решение */}
        <motion.div className="about-left" variants={fade}>
          <h2>Условие задачи</h2>
          <p>
            В треугольнике <b>ABC</b> проведена биссектриса <b>AM</b>.<br/>
            Прямая через <b>B</b>, перпендикулярная <b>AM</b>, пересекает <b>AC</b> в точке <b>N</b>.<br/>
            <b>AB = 6, BC = 5, AC = 9.</b>
          </p>
          <p>
            а) Докажите, что биссектриса угла C делит отрезок MN пополам.<br/>
            б) Найдите отношение AP : PN, где P — точка пересечения биссектрис.
          </p>

          <button className="btn" onClick={() => setOpen(!open)}>
            {open ? 'Скрыть решение' : 'Показать решение'}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                className="solve"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{ hidden:{}, show:{ transition:{ staggerChildren: 0.2 } } }}
              >
                <motion.ol className="steps" variants={fade}>
                  {steps.map((s, i) => <li key={i}>{s}</li>)}
                </motion.ol>

                <motion.div className="diagram-small" variants={fade}>
                  <svg viewBox="0 0 200 180">
                    <g opacity=".25">
                      <line x1="20" y1="170" x2="180" y2="170" stroke="#888" />
                      <line x1="20" y1="170" x2="100" y2="20" stroke="#888" />
                      <line x1="100" y1="20" x2="180" y2="170" stroke="#888" />
                    </g>
                    <line x1="150" y1="170" x2="100" y2="20" stroke="#68d391" />
                    <line x1="180" y1="170" x2="115" y2="90" stroke="#90cdf4" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 2) ЦЕНТР: чертёж условия */}
        <motion.div className="about-center" variants={fade}>
          <div className="diagram-big">
          <svg viewBox="0 0 200 180">
            <defs>
              <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6" fill="#f56565" />
              </marker>
            </defs>
            <line x1="20" y1="170" x2="180" y2="170" stroke="#ccc"/>
            <line x1="20" y1="170" x2="100" y2="20" stroke="#ccc"/>
            <line x1="100" y1="20" x2="180" y2="170" stroke="#ccc"/>
            <line x1="100" y1="20" x2="120" y2="60" stroke="#f56565" strokeDasharray="4" markerEnd="url(#arr)"/>
            <circle cx="100" cy="170" r="3" fill="#38b2ac"/>
            <circle cx="150" cy="170" r="3" fill="#f6ad55"/>
            <circle cx="115" cy="90"  r="3" fill="#d53f8c"/>
          </svg>
          </div>
        </motion.div>

        {/* 3) ПРАВО: преимущества */}
        <motion.div className="about-right" variants={fade}>
          <h3 className="tagline"><span>EGE+</span> — математика без зевоты</h3>
          <ul className="benefits">
            <li>⏱ 2–5 мин ролики — никакой скучной теории</li>
            <li>🔑 Только то, что реально нужно для ЕГЭ</li>
            <li>🎚 Объяснения «на твоём уровне»</li>
            <li>🎮 Геймификация: челленджи, streak‑и, XP</li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
