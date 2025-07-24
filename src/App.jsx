import React from 'react';
import Header from './Header';
import About from './blocks/About';

function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: '40px' }}>
      <About />
      </main>
    </div>
  );
}

export default App;
