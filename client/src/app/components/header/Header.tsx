import Button from '../button/Button';
import './header.scss';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../images/pinkhawklogo.svg';

function Header() {
  return (
    <header className="header">
      <NavLink to="/" className="logo-container">
        <Logo className="logo" />
        <span className="logo-text">Pink Hawk</span>
      </NavLink>
      <nav className="header_items">
        <NavLink to="/signup">
          <Button text={'Sign up'} />
        </NavLink>
        <NavLink to="/login">
          <Button text={'Sign in'} type={'btn-inverted'} />
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
