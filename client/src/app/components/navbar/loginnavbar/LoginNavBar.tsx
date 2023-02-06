import React from 'react';
import { NavLink } from 'react-router-dom';
import './LoginNavBar.scss';
import copilotButton from '../../../../images/copilot.png';
import growthButton from '../../../../images/growth.png';
import userIcon from '../../../../images/user.png';
import { ReactComponent as Logo } from '../../../../images/pinkhawklogo.svg';
import { useAppSelector } from '../../../hooks/hooks';

const NavBarUser: React.FC = () => {
  const profilePicture = useAppSelector((state) => state.user.profilePicture);

  return (
    <header className="user-navbar">
      <NavLink to="/dashboard" className="logo-container">
        <Logo className="logo" />
        <span className="logo-text">Pink Hawk</span>
      </NavLink>
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
        <NavLink to="/dashboard/user-preferences">
          <img
            alt="user-preferences"
            className="icon-button"
            src={profilePicture ? profilePicture : userIcon}
          />
        </NavLink>
      </nav>
    </header>
  );
};

export default NavBarUser;
