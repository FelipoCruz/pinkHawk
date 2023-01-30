import React from "react";
import Selection from "../Selection/Selection";

const CopilotMenu = () => {
  const [selectedComponent, setSelectedComponent] = React.useState<React.ReactNode | null>(null);

  return (
    <div>
      <h1>copilot menu</h1>
      <button onClick={() => setSelectedComponent} className='preferences'>Preferences</button>
      <button onClick={() => setSelectedComponent(<Selection />)} className='selection'>Selection</button>

      <button className='queu'>Queu</button>
      {selectedComponent}
    </div>
  );
};

export default CopilotMenu;
