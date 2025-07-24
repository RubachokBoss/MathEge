import React from 'react';
import Header from './Header';
import PricingSection from './blocks/pricelist';

function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: '40px' }}>
        <PricingSection />
      </main>
    </div>
  );
}

export default App;
