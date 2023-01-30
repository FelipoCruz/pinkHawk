import Button from '../button/Button';
import './header.scss';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <NavLink to="/">
        <img alt="home logo" className="logo" />
      </NavLink>
      <nav className="header_items">
        <NavLink to="/signup">
          <Button text={'Sign up'} />
        </NavLink>
        <NavLink to="/login">
          <Button text={'Sign in'} type={'btn-inverted'} />
        </NavLink>
      </nav>
      <button className="menu">
        <img alt="icon menu" />
      </button>
    </header>
  );
}

export default Header;
