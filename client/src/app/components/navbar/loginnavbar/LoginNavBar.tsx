import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './LoginNavBar.scss';
import { useAppSelector } from '../../../hooks/hooks';
import logo from '../../../../images/pinkhawklogo.svg';
import copilotButton from '../../../../images/copilot.png';
import growthButton from '../../../../images/growth.png';
import userIcon from '../../../../images/user.png';
import Button from '../../button/Button';

const NavBarUser: React.FC = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<React.ReactNode | null>(null);
  const user = useAppSelector((state) => state.user);
  console.log('user in state', user);

  return (
    <header className="user-navbar">
      <img alt="pinkhawk logo" className="logo" src={logo} />
      <nav className="navbar-items">
        <NavLink to="/dashboard/co-pilot">
          <img
            alt="copilot-button"
            className="icon-button"
            src={copilotButton}
          />
        </NavLink>
        <NavLink to="/dashboard/growth">
          <img alt="growth-button" className="icon-button" src={growthButton} />
        </NavLink>
      </nav>
      <nav className="navbar-items">
        <NavLink to="user/preferences">
          <img alt="user-preferences" className="icon-button" src={userIcon} />
        </NavLink>
      </nav>
    </header>
  );
};

export default NavBarUser;
