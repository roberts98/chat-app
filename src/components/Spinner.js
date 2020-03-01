import React from 'react';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

import { Colors } from '../styles';

export function SmallSpinner() {
  return <ClipLoader size={30} color={Colors.BLUE} loading />;
}

export function FullPageSpinner() {
  return (
    <Center>
      <SmallSpinner />
    </Center>
  );
}

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
