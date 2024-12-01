import React, { useState } from 'react';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAddition = async () => {
    try {
      const response = await fetch('/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ num1: parseFloat(num1), num2: parseFloat(num2) })
      });
      const data = await response.json();

      if (response.ok) {
        setResult(data.result);
        setError(null);
      } else {
        setError(data.error || 'Something went wrong');
        setResult(null);
      }
    } catch (error) {
      setError('Failed to connect to the server');
      setResult(null);
    }
  };

  return (
    <div>
      <h1>Simple Addition</h1>
      
      <div>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Enter first number"
        />
      </div>
      
      <div>
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Enter second number"
        />
      </div>
      
      <button onClick={handleAddition}>Add Numbers</button>
      
      {result !== null && (
        <div>
          <h2>Result: {result}</h2>
        </div>
      )}

      {error && (
        <div style={{ color: 'red' }}>
          <h2>Error: {error}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
