import React from 'react';
import styled from 'styled-components';

import { Colors } from '../styles';
import search from '../assets/icons/search.svg';

export function Search() {
  return (
    <InputWrapper icon={search}>
      <Input type="text" placeholder="Search" />
    </InputWrapper>
  );
}

export const InputWrapper = styled.div`
  margin-bottom: 20px;
  position: relative;

  &::before {
    content: url(${({ icon }) => icon});
    position: absolute;
    top: 21px;
    left: 42px;
  }
`;

export const Input = styled.input`
  height: 70px;
  width: 100%;
  border: unset;
  color: ${Colors.GRAY};
  padding-left: 75px;
  border-radius: 6px;
  font-size: 18px;

  &::placeholder {
    color: ${Colors.GRAY};
  }
`;
