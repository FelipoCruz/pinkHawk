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
    }, props.delay || 300);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  const logoutUser = () => {
    props.logout();
  };

  /*
              content1="- Add your preferences and tags !"
              content2="- Give access to your twitter account !"
  */

  const warningContent = () => {
    return (
      <>
        <div>Please: </div>
        {props.user.topics.length === 0 && (
          <div> - Add your posting topics</div>
        )}
        {props.user.postingHours.length === 0 && (
          <div> - Add your posting hours</div>
        )}
        {!props.user.twitterToken && (
          <div> - Give access to your twitter account</div>
        )}
        <Link
          className="pref-link"
          to="/dashboard/user-preferences"
          onClick={hideTip}
        >
          Preferences
        </Link>
      </>
    );
  };

  const userContent = () => {
    return (
      <>
        <Link
          className="user-link"
          to="/dashboard/user-settings"
          onClick={hideTip}
        >
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
