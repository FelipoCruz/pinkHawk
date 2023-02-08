import { NavLink } from 'react-router-dom';
import './LoginNavBar.scss';
import { ReactComponent as Logo } from '../../../images/pinkhawklogo.svg';
import { toggleSidebar } from '../../../store/slices/layout.slice';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const NavBarUser = () => {
  const layout = useAppSelector((state) => state.layout);
  const dispatch = useAppDispatch();

  const toggleClick = () => {
    dispatch(toggleSidebar(!layout.sidebar));
  };

  return (
    <header className="user-navbar fixed-top">
      {/* <button className="mobile-menu-button" onClick={toggleClick}> */}
      <GiHamburgerMenu className="mobile-menu-button" onClick={toggleClick} />
      {/* </button> */}
      <a href="/dashboard" className="logo-container">
        <Logo className="logo" />
        <span className="logo-text">Pink Hawk</span>
      </a>
      {/* <nav className="navbar-items">
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
      </nav> */}
      <nav className="navbar-items">
        <NavLink to="user-settings">
          <CgProfile />
        </NavLink>
      </nav>
    </header>
  );
};

export default NavBarUser;
