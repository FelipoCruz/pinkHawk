import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdLogout } from 'react-icons/md';
import { AiOutlineSetting } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import './tooltip.scss';

const Tooltip = (props: any) => {
  let timeout: any;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  const logoutUser = () => {
    props.logout();
  };

  const warningContent = () => {
    return (
      <>
        <div>{props.content1}</div>
        {props.content2 && <div>{props.content2}</div>}
        <Link className="pref-link" to="/dashboard/user-preferences">
          Preferences
        </Link>
      </>
    );
  };

  const userContent = () => {
    return (
      <>
        <Link className="user-link" to="/dashboard/user-settings">
          <AiOutlineSetting className="tooltip-logo" />
          Settings
        </Link>
        <button className="user-link" onClick={logoutUser}>
          <MdLogout className="tooltip-logo" />
          Logout
        </button>
      </>
    );
  };

  return (
    <div
      className="Tooltip-Wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <div
          className={
            props.type === 'warning'
              ? 'Tooltip-Tip bottom tooltip-large'
              : 'Tooltip-Tip bottom tooltip-small'
          }
        >
          {props.type === 'warning' ? warningContent() : props.type === ''}
          {props.type === 'user-menu' ? userContent() : props.type === ''}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
