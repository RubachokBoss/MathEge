import React, { useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Stars } from '@react-three/drei';
import * as THREE from 'three';
import './background.css';


const MATH_LABELS = [
  '∑', 'π', '∫', '√', '≈', '≠', '→', 'Δ',
  'f(x)=x²', 'sin x', 'log₂ n', 'lim → ∞', 'P(A)', 'cos α', 'tg β'
];

function FloatingText({ text, color, position, size = 0.6 }) {
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <Text
        font="/STIXTwoText-Italic[wght].ttf"
        position={position}
        color={color}
        fontSize={size}
        anchorX="center"
        anchorY="middle"
        depthOffset={-10}
      >
        {text}
      </Text>
    </Float>
  );
}

function FloatingBook({ position, color }) {
  const ref = React.useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.1;
    ref.current.rotation.y += delta * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} position={position}>
        {/* простая «книга» как прямоугольный параллелепипед */}
        <boxGeometry args={[0.8, 1.1, 0.15]} />
        <meshStandardMaterial color={color} metalness={0.1} roughness={0.5} />
      </mesh>
    </Float>
  );
}

function Scene() {
  const labels = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 18; i++) {
      arr.push({
        text: MATH_LABELS[Math.floor(Math.random() * MATH_LABELS.length)],
        color: ['#38b2ac', '#f6ad55', '#805ad5', '#90cdf4'][i % 4],
        position: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * -8 - 2 // чуть в глубину
        ],
        size: 0.5 + Math.random() * 0.4
      });
    }
    return arr;
  }, []);

  const books = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push({
        color: ['#2b6cb0', '#38b2ac', '#d53f8c', '#805ad5'][i % 4],
        position: [
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * -10 - 2
        ],
      });
    }
    return arr;
  }, []);

  return (
    <>
      {/* Немного «звёзд»-частиц для глубины */}
      <Stars radius={80} depth={50} count={1200} factor={2} saturation={0} fade speed={1} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      {labels.map((l, i) => (
        <FloatingText key={i} {...l} />
      ))}

      {books.map((b, i) => (
        <FloatingBook key={i} {...b} />
      ))}
    </>
  );
}

export default function Background3D() {
  return (
    <div className="bg3d">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={[1, 2]}
      >
        <fog attach="fog" args={['#0f1116', 12, 28]} />
        <Scene />
      </Canvas>

      {/* лёгкая градиентная вуаль для читаемости контента */}
      <div className="bg3d-overlay" />
    </div>
  );
}
