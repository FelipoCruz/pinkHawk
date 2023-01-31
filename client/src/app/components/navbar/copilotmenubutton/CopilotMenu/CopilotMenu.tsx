import React from "react";
import TopicsInput from "../../../topics-input/topics-input";
import Selection from "../Selection/Selection";

const CopilotMenu = () => {
  const [selectedComponent, setSelectedComponent] = React.useState<React.ReactNode | null>(null);

  return (
    <div>
      <h1>copilot menu</h1>
      <button onClick={() => setSelectedComponent(<Selection />)} className='selection'>Selection</button>
      <button className='queue'>Queue</button>
      <button onClick={() => setSelectedComponent(<TopicsInput/>)} className='preferences'>Preferences</button>
      {selectedComponent}
    </div>
  );
};

export default CopilotMenu;
