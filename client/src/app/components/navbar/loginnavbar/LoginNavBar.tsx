import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './LoginNavBar.scss';
import { useAppSelector } from '../../../hooks/hooks';
import CopilotMenu from '../copilotmenubutton/CopilotMenu/CopilotMenu';
import GrowthMenu from '../growthmenu/GrowthMenu';

const NavBarUser: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode | null>(null);
  const user = useAppSelector((state) => state.user);
  console.log('user in state', user);

  return (
    <header className='user-navbar'>
      <img alt='pinkhawk logo' className='logo' />
      <nav className='user-navbar-buttons'>
        <button
          onClick={() => setSelectedComponent(<CopilotMenu />)}
        >
          Copilot
        </button>
        <button
          onClick={() => setSelectedComponent(<GrowthMenu />)}
        >
          Growth
        </button>
      </nav>
      {/* <nav className='navbar-items'>
        <NavLink to='/'>
          <Button text={'Logout'} type={'btn-inverted'} />
        </NavLink>
      </nav> */}
      <button className='menu'>
        <img alt='icon menu' />
      </button>
      {selectedComponent}
    </header>
  );
}

export default NavBarUser;
