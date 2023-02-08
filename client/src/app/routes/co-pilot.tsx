import React from 'react';
import { generateTweetServiceClient } from '../../services/api.service';
import { useAppSelector } from '../hooks/hooks';
import { useState } from 'react';
import CopilotMenu from '../components/CopilotMenu/CopilotMenu';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Selection from '../components/Selection/Selection';
import Queue from '../components/Queu/Queue';
import TopicsDefinition from './topics-definition';

const CoPilot = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="selection" />} />
        <Route path="selection" element={<Selection />} />
        <Route path="queue" element={<Queue />} />
      </Routes>
      {/* <CopilotMenu></CopilotMenu> */}
      <Outlet />
    </>
  );
};

export default CoPilot;
