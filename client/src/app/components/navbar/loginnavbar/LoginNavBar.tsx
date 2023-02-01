import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './LoginNavBar.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import logo from '../../../../images/pinkhawklogo.svg';
import copilotButton from '../../../../images/copilot.png';
import growthButton from '../../../../images/growth.png';
import userIcon from '../../../../images/user.png';
import Button from '../../button/Button';
import { logout } from '../../../../services/api.service';
import { deactivateUser } from '../../../../store/slices/user.slice';

const NavBarUser: React.FC = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<React.ReactNode | null>(null);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    const response = await logout();

    if (response.status !== 'success') {
      throw new Error('A problem occurred while logging out');
    }
    dispatch(deactivateUser());
    console.log(response);

    localStorage.removeItem('user');
    navigate('/dashboard');
  };

  return (
    <header className="user-navbar">
      <div className="logo-container">
        <img alt="pinkhawk logo" className="logo" src={logo} />
        <span className="logo-text">Pink Hawk</span>
      </div>
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
        <button className="btn btn-inverted" onClick={logoutUser}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default NavBarUser;
