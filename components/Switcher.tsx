import React, { useState } from 'react';

const Switcher: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleSwitch = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <button onClick={() => handleSwitch('option1')}>Option 1</button>
      <button onClick={() => handleSwitch('option2')}>Option 2</button>
      <p>Selected Option: {selectedOption}</p>
    </div>
  );
};

export default Switcher;
