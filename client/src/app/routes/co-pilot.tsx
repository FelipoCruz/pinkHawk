import React from 'react';
import { generateTweetServiceClient } from '../../services/api.service';
import { useAppSelector } from '../hooks/hooks';
import { useState } from 'react';
import CopilotMenu from '../components/navbar/copilotmenubutton/CopilotMenu/CopilotMenu';

const CoPilot = () => {
  const user = useAppSelector((state) => state.user);


  return (
    <>
      <CopilotMenu></CopilotMenu>
    </>
  );
};

export default CoPilot;
