import React from 'react';

function SimpleTest() {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#000', 
      color: '#00ffff', 
      minHeight: '100vh',
      fontSize: '24px'
    }}>
      <h1>🚀 QUANTUM CHARTS TEST</h1>
      <p>If you can see this, React is working!</p>
      <div style={{ 
        marginTop: '20px',
        padding: '10px',
        border: '2px solid #ff0080',
        borderRadius: '10px'
      }}>
        ⚡ ENERGY TEST ⚡
      </div>
    </div>
  );
}

export default SimpleTest;