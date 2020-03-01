import React from 'react';

import { signInWithGoogle } from '../firebase';
import { Button, ButtonWrapper } from './';
import userIcon from '../assets/icons/sidebar/contact-white.svg';
import styled from 'styled-components';

export function Login() {
  function handleClick() {
    signInWithGoogle();
  }

  return (
    <Center>
      <ButtonWrapper icon={userIcon}>
        <Button onClick={handleClick}>Login with google</Button>
      </ButtonWrapper>
    </Center>
  );
}

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgb(243, 243, 251);
`;
