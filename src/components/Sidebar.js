import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { UserContext } from '../contexts';
import { signOut } from '../firebase/auth';
import { Colors, Device } from '../styles';
import calendar from '../assets/icons/sidebar/calendar.svg';
import chevronDown from '../assets/icons/sidebar/chevron-down.svg';
import contact from '../assets/icons/sidebar/contact.svg';
import home from '../assets/icons/sidebar/home.svg';
import messenger from '../assets/icons/sidebar/messenger.svg';
import notifications from '../assets/icons/sidebar/notifications.svg';
import settings from '../assets/icons/sidebar/settings.svg';
import power from '../assets/icons/sidebar/power.svg';
import { useWindowWidth } from '../hooks/useWindowWidth';

export function Sidebar() {
  const {
    user: { displayName, photoURL }
  } = useContext(UserContext);
  const width = useWindowWidth();
  const [isCollapsed, setIsCollapsed] = useState(true);

  function handleLogout() {
    signOut();
  }

  if (isCollapsed && width < 1200) {
    return (
      <Burger
        onClick={() => setIsCollapsed(!isCollapsed)}
        isCollapsed={isCollapsed}
      />
    );
  }

  return (
    <>
      {width < 1200 && (
        <Burger
          onClick={() => setIsCollapsed(!isCollapsed)}
          isCollapsed={isCollapsed}
        />
      )}
      <Wrapper>
        <User>
          <Image src={photoURL} alt={displayName} />
          <UserName>
            <span>{displayName}</span>
          </UserName>
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
    </>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  margin-right: 59px;

  @media ${Device.laptop} {
    width: 290px;
    box-shadow: -65px 45px 100px #5680f8;
  }
`;

const User = styled.div`
  padding-top: 20px;
  text-align: center;

  @media ${Device.laptop} {
    margin-top: 94px;
  }
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
  position: relative;

  span {
    position: relative;

    &::after {
      content: url(${chevronDown});
      position: absolute;
      right: -25px;
      top: 3px;
    }
  }
`;

const Menu = styled.div`
  padding-left: 50px;
  margin-top: 50px;

  @media ${Device.laptop} {
    margin-top: 87px;
    padding-left: 79px;
  }
`;

const StyledMenuLink = styled(Link)`
  color: ${Colors.GRAY};
  text-decoration: none;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;
  display: block;
  position: relative;
  margin-bottom: 30px;

  &::before {
    content: url(${({ icon }) => icon});
    position: absolute;
    left: -41px;
    top: -3px;
  }

  &:hover {
    color: ${Colors.BLUE};
  }

  @media ${Device.laptop} {
    margin-bottom: 56px;
  }
`;

const Logout = styled(StyledMenuLink)`
  position: absolute;
  bottom: 50px;
  left: 50px;

  @media ${Device.laptop} {
    left: 79px;
  }
`;

const Burger = styled.span`
  position: absolute;
  left: 30px;
  top: 20px;

  &::before,
  &::after {
    content: '';
    height: 2px;
    width: 30px;
    background-color: ${Colors.GRAY};
    position: absolute;
    left: 0;
    transition: all 0.4s;
  }

  &::before {
    top: 0;
    transform: ${({ isCollapsed }) =>
      !isCollapsed ? 'rotate(135deg)' : 'rotate(0)'};
  }

  &::after {
    top: ${({ isCollapsed }) => (!isCollapsed ? '0' : '10px')};
    transform: ${({ isCollapsed }) =>
      !isCollapsed ? 'rotate(225deg)' : 'rotate(0)'};
  }
`;
