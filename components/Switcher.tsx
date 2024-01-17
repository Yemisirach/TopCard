import React, { useState } from "react";

const Switcher: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleSwitch = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <button onClick={() => handleSwitch("option1")}>workspace1</button>
      <button onClick={() => handleSwitch("option2")}>workspace2</button>
      <p>Selected Option: {selectedOption}</p>
    </div>
  );
};

export default Switcher;
