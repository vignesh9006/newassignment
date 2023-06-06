// src/client.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [password, setPassword] = useState('');
  const [steps, setSteps] = useState(null);

  const checkPassword = async () => {
    try {
      const response = await axios.post('/check-password', { password });
      setSteps(response.data.steps);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Password Strength Checker</h1>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={checkPassword}>Check</button>
      {steps !== null && <p>Steps required: {steps}</p>}
    </div>
  );
}

export default App;
