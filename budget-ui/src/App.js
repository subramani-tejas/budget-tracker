import React, { useState, useEffect } from 'react';

function App() {
  const [title, setTitle] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:8080/api/sheet-title')
      .then(response => response.text())
      .then(data => setTitle(data))
      .catch(error => {
        console.error("Error:", error);
        setTitle('Failed to load title.');
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Budget Tracker</h1>
      <h2>File Title: {title}</h2>
    </div>
  );
}

export default App;