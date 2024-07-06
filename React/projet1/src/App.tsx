import React, { useState } from 'react';
import './App.css';

type ChildProps = {
  name: string;
  sendValueToParent: (value: string) => void;
};

const Child: React.FC<ChildProps> = ({ name, sendValueToParent }) => {
  const handleClick = () => {
    sendValueToParent(`Hello from ${name}`);
  };

  return (
    <div>
      childComponent with prop name: {name}
      <button onClick={handleClick}>Send Value to Parent</button>
    </div>
  );
};

function App() {
  const [receivedValue, setReceivedValue] = useState('');

  const handleValueFromChild = (value: string) => {
    setReceivedValue(value);
  };

  return (
    <div className="App">
      hello
      <Child name="Jean" sendValueToParent={handleValueFromChild} />
      <Child name="Marie" sendValueToParent={handleValueFromChild} />
      <div>Received Value: {receivedValue}</div>
    </div>
  );
}

export default App;
