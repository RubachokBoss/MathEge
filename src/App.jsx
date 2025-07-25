import React from 'react';
import Header from './Header';
import About from './blocks/About';
import PricingSection from './blocks/pricelist';
import Background3D from './blocks/background';

function App() {
  return (
    <div>
      <Background3D />  
      <Header />
      <main style={{ padding: '40px' }}>
      <About />
      <PricingSection />
      </main>
    </div>
  );
}

export default App;
