import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './LoginNavBar.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import copilotButton from '../../../../images/copilot.png';
import growthButton from '../../../../images/growth.png';
import userIcon from '../../../../images/user.png';
import { logout } from '../../../../services/api.service';
import { deactivateUser } from '../../../../store/slices/user.slice';
import { ReactComponent as Logo } from '../../../../images/pinkhawklogo.svg';

const NavBarUser: React.FC = () => {
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
        <NavLink to="user/preferences">
          <img alt="user-preferences" className="icon-button" src={userIcon} />
        </NavLink>
      </nav>
    </header>
  );
};

export default NavBarUser;
