import React from 'react';
import TopicsInput from '../../../topics-input/topics-input';
import Queue from '../Queu/Queue';
import Selection from '../Selection/Selection';
import './CopilotMenu.scss';

const CopilotMenu = () => {
  const [selectedComponent, setSelectedComponent] =
    React.useState<React.ReactNode | null>(null);

  return (
    <div className="copilot">
      <nav className="copilot-nav">
        <button
          onClick={() => setSelectedComponent(<Selection />)}
          className="btn"
        >
          Selection
        </button>
        <button onClick={() => setSelectedComponent(<Queue />)} className="btn">
          Queue
        </button>
        <button
          onClick={() => setSelectedComponent(<TopicsInput />)}
          className="btn"
        >
          Preferences
        </button>
      </nav>
      <div className="copilot-content">{selectedComponent}</div>
    </div>
  );
};

export default CopilotMenu;
