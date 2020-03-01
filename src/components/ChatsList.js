import React, { useContext } from 'react';

import { ChatsContext } from '../contexts';
import { ChatTeaser } from './';
import styled from 'styled-components';

export function ChatsList() {
  const { isLoading, chats } = useContext(ChatsContext);

  if (isLoading) {
    return 'chats loading';
  }

  return (
    <Wrapper>
      {chats.map(id => (
        <ChatTeaser id={id} key={id} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-height: 50vh;
  overflow-y: auto;
  overflow-x: hidden;
`;
