import Button from '../button/Button';
import './header.scss';
import { NavLink } from 'react-router-dom';

function HeaderUser() {
  return (
    <header className='header-user'>
      {/* <Button onClick={() => {}} text={'Home'} /> */}
      <img alt='home logo' className='logo' />
      <nav className='header_items'>
        <NavLink to='/signup'>
          <Button text={'Sign up'} />
        </NavLink>
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

export default HeaderUser;