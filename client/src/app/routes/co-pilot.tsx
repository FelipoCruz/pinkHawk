import React from 'react';
import { generateTweetServiceClient } from '../../services/api.service';
import { useAppSelector } from '../hooks/hooks';
import { useState } from 'react';
import CopilotMenu from '../components/navbar/copilotmenubutton/CopilotMenu/CopilotMenu';
import { Navigate, Route, Routes } from 'react-router-dom';
import Selection from '../components/navbar/copilotmenubutton/Selection/Selection';
import Queue from '../components/navbar/copilotmenubutton/Queu/Queue';
import TopicsDefinition from './topics-definition';

const CoPilot = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <>
      <CopilotMenu></CopilotMenu>
      <Routes>
        <Route path="selection" element={<Selection />} />
        <Route path="queue" element={<Queue />} />
        <Route path="topics-definition" element={<TopicsDefinition />} />
        <Route path="*" element={<Navigate to="selection" />} />
      </Routes>
    </>
  );
};

export default CoPilot;
