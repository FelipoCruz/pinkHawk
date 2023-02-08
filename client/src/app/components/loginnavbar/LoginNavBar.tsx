import { NavLink, useNavigate } from 'react-router-dom';
import './LoginNavBar.scss';
import { ReactComponent as Logo } from '../../../images/pinkhawklogo.svg';
import { toggleSidebar } from '../../../store/slices/layout.slice';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { IoWarningOutline } from 'react-icons/io5';
import Tooltip from '../tooltip/tooltip';
import { logout } from '../../../services/api.service';
import { deactivateUser } from '../../../store/slices/user.slice';

const NavBarUser = () => {
  const user = useAppSelector((state) => state.user);
  const layout = useAppSelector((state) => state.layout);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    const response = await logout();

    if (response.status !== 'success') {
      throw new Error('A problem occurred while logging out');
    }

    dispatch(deactivateUser());
    localStorage.removeItem('user');
    navigate('/dashboard');
  };

  const toggleClick = () => {
    dispatch(toggleSidebar(!layout.sidebar));
  };

  return (
    <header className="user-navbar fixed-top">
      <GiHamburgerMenu className="mobile-menu-button" onClick={toggleClick} />
      <a href="/dashboard" className="logo-container">
        <Logo className="logo" />
        <span className="logo-text">Pink Hawk</span>
      </a>
      <nav className="navbar-items">
        <div className="navbar-warning">
          {(!user.twitterToken || user.frequencyTweetPosting < 1) && (
            <Tooltip
              content1="- Add your preferences !"
              content2="- Give access to your twitter account !"
              direction="bottom"
              type="warning"
            >
              <IoWarningOutline />
            </Tooltip>
          )}
        </div>
        <div className="navbar-user">
          <Tooltip direction="bottom" type="user-menu" logout={logoutUser}>
            <CgProfile />
          </Tooltip>
        </div>
      </nav>
    </header>
  );
};

export default NavBarUser;
