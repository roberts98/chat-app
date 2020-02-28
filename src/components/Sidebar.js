import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { UserContext } from '../contexts';
import { signOut } from '../firebase/auth';
import { Colors } from '../styles';
import calendar from '../assets/icons/sidebar/calendar.svg';
import chevronDown from '../assets/icons/sidebar/chevron-down.svg';
import contact from '../assets/icons/sidebar/contact.svg';
import home from '../assets/icons/sidebar/home.svg';
import messenger from '../assets/icons/sidebar/messenger.svg';
import notifications from '../assets/icons/sidebar/notifications.svg';
import settings from '../assets/icons/sidebar/settings.svg';
import power from '../assets/icons/sidebar/power.svg';

export function Sidebar() {
  const {
    user: { displayName, photoURL }
  } = useContext(UserContext);

  function handleLogout() {
    signOut();
  }

  return (
    <Wrapper>
      <User>
        <Image src={photoURL} alt={displayName} />
        <UserName>{displayName}</UserName>
      </User>
      <Menu>
        <StyledMenuLink icon={home} to="/">
          Home
        </StyledMenuLink>
        <StyledMenuLink icon={messenger} to="/">
          Chat
        </StyledMenuLink>
        <StyledMenuLink icon={contact} to="/">
          Contact
        </StyledMenuLink>
        <StyledMenuLink icon={notifications} to="/">
          Notifications
        </StyledMenuLink>
        <StyledMenuLink icon={calendar} to="/">
          Calendar
        </StyledMenuLink>
        <StyledMenuLink icon={settings} to="/">
          Settings
        </StyledMenuLink>
      </Menu>
      <Logout icon={power} to="/" onClick={handleLogout}>
        Log Out
      </Logout>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 290px;
  height: 100vh;
  box-shadow: -65px 45px 100px #5680f8;
  margin-right: 59px;
`;

const User = styled.div`
  margin-top: 94px;
  text-align: center;
`;

const Image = styled.img`
  width: 86px;
  height: 86px;
  border-radius: 50%;
`;

const UserName = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: ${Colors.DARK};
  margin-top: 11px;
  margin-right: 25px;
  position: relative;

  &::after {
    content: url(${chevronDown});
    position: absolute;
    right: 23px;
    top: 3px;
  }
`;

const Menu = styled.div`
  margin-top: 87px;
  padding-left: 79px;
`;

const StyledMenuLink = styled(Link)`
  color: ${Colors.GRAY};
  text-decoration: none;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;
  display: block;
  margin-bottom: 56px;
  position: relative;

  &::before {
    content: url(${({ icon }) => icon});
    position: absolute;
    left: -41px;
    top: -3px;
  }

  &:hover {
    color: ${Colors.BLUE};
  }
`;

const Logout = styled(StyledMenuLink)`
  position: absolute;
  left: 79px;
  bottom: 50px;
`;
