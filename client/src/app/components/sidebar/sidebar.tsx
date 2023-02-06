import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import './sidebar.scss';
import { BsBarChartLine, BsCardChecklist } from 'react-icons/bs';
import { GiSettingsKnobs } from 'react-icons/gi';
import { RxDot } from 'react-icons/rx';
import { toggleSidebar } from '../../../store/slices/layout.slice';

const Sidebar = ({ navbarState }: { navbarState: boolean }) => {
  const layout = useAppSelector((state) => state.layout);
  const dispatch = useAppDispatch();

  const closeSidebar = () => {
    dispatch(toggleSidebar(true));
  };

  return (
    // <div id="sidebar" className={!layout.sidebar ? 'closed' : 'opened'}>
    <aside
      id="sidebar"
      className={layout.sidebar ? 'sidebar closed' : 'sidebar opened'}
    >
      <nav className="sidebar-nav">
        <NavLink
          className="sidebar-nav-item"
          to="/dashboard/co-pilot"
          onClick={closeSidebar}
        >
          <BsCardChecklist />
          Copilot
        </NavLink>
        <nav className="sidebar-sub-nav">
          <NavLink
            to="co-pilot/selection"
            className="sidebar-sub-nav-subitem"
            onClick={closeSidebar}
          >
            <RxDot />
            Selection
          </NavLink>
          <NavLink
            to="co-pilot/queue"
            className="sidebar-sub-nav-subitem"
            onClick={closeSidebar}
          >
            <RxDot />
            Queue
          </NavLink>
        </nav>
        <NavLink
          className="sidebar-nav-item"
          to="/dashboard/growth"
          onClick={closeSidebar}
        >
          <BsBarChartLine />
          Growth
        </NavLink>
        <NavLink
          className="sidebar-nav-item"
          to="/dashboard/user-preferences"
          onClick={closeSidebar}
        >
          <GiSettingsKnobs />
          Preferences
        </NavLink>
      </nav>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </aside>
  );
};

export default Sidebar;
