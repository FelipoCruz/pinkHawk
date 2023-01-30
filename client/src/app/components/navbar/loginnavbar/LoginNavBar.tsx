import { useState } from 'react';
import Button from '../../button/Button';
import { NavLink } from 'react-router-dom';
import './LoginNavBar.scss';
import { useAppSelector } from '../../../hooks/hooks';
import CopilotMenu from '../copilotmenu/CopilotMenu';

function NavBarUser() {
  const [selectedComponent, setSelectedComponent] = useState();
  const user = useAppSelector((state) => state.user);
  console.log('user in state', user);

  return (
    <header className='navbar-user'>
      <img alt='pinkhawk logo' className='logo' />
      <Button onClick={() => setSelectedComponent(<CopilotMenu />)} text={'Copilot'} />
      <nav className='navbar-items'>
        <NavLink to='/'>
          <Button text={'Logout'} type={'btn-inverted'} />
        </NavLink>
      </nav>
      <button className='menu'>
        <img alt='icon menu' />
      </button>
    </header>
  );
}

export default NavBarUser;