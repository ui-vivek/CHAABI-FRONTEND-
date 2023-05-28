import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file for styling

const App = () => {
  const [currentKey, setCurrentKey] = useState('');
  const [nextKey, setNextKey] = useState('');
  const [keysPressed, setKeysPressed] = useState(0);
  const [correctKeys, setCorrectKeys] = useState(0);
  const [timer, setTimer] = useState(300);

  const availableKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [timer]);

  const handleKeyPress = e => {
    const pressedKey = e.key.toLowerCase();

    if (availableKeys.includes(pressedKey)) {
      setCurrentKey(pressedKey);
      setKeysPressed(prevKeysPressed => prevKeysPressed + 1);

      if (pressedKey === nextKey) {
        setCorrectKeys(prevCorrectKeys => prevCorrectKeys + 1);
      }

      setNextKey(getNextKey());
    }
  };

  const calculateAccuracy = () => {
    if (keysPressed === 0) {
      return 0;
    }

    const accuracy = (correctKeys / keysPressed) * 100;
    return Math.round(accuracy);
  };

  const getNextKey = () => {
    const currentIndex = availableKeys.indexOf(currentKey);

    if (currentIndex !== -1) {
      const nextIndex = currentIndex + 1;
      return availableKeys[nextIndex % availableKeys.length];
    }

    return '';
  };

  return (
    <div className="container">
      <h1>Touch Typing Practice</h1>
      <div className="stats-container">
        <p>Time Remaining: {timer} seconds</p>
        <p>Keys Pressed: {keysPressed}</p>
        <p>Accuracy: {calculateAccuracy()}%</p>
      </div>
      <div className="keys-container">
        <p className="current-key">Current Key: {currentKey}</p>
        <p className="next-key">Next Key: {nextKey}</p>
      </div>
      <div>
        <input type="text" onKeyPress={handleKeyPress} autoFocus className="typing-input" />
      </div>
    </div>
  );
};

export default App;
