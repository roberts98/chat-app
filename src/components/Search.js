import React from 'react';
import styled from 'styled-components';

import { Colors } from '../styles';
import search from '../assets/icons/search.svg';

export function Search() {
  return (
    <InputWrapper>
      <Input type="text" placeholder="Search" />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  margin-bottom: 20px;
  margin-top: 29px;
  position: relative;

  &::before {
    content: url(${search});
    position: absolute;
    top: 21px;
    left: 42px;
  }
`;

const Input = styled.input`
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
