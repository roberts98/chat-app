import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Colors, Device } from '../styles';
import { useMessagesSubscriber } from '../hooks';

export function MessagesList({ userId, chatId }) {
  const ref = useRef();
  const messages = useMessagesSubscriber(chatId);

  useEffect(() => {
    ref.current.scrollIntoView();
  }, [messages]);

  return (
    <Wrapper>
      {messages.map(message => {
        return (
          <Message isMine={message.senderId === userId} key={message.id}>
            {message.value}
          </Message>
        );
      })}
      <div ref={ref} style={{ float: 'left', clear: 'both' }} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-height: 50vh;
  overflow-y: auto;
  padding: 30px 20px;

  @media ${Device.laptopL} {
    padding: 30px 60px;
  }
`;

const Message = styled.div`
  background: ${({ isMine }) =>
    !isMine
      ? `linear-gradient(
  121deg,
  rgba(124, 184, 247, 1) 0%,
  rgba(42, 139, 242, 1) 100%
)`
      : Colors.WHITE};
  color: ${({ isMine }) => (isMine ? Colors.GRAY : Colors.WHITE)};
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 15px 25px;
  border: ${({ isMine }) => (isMine ? `1px solid ${Colors.LIGHT}` : 'none')};
  float: ${({ isMine }) => (isMine ? 'right' : 'left')};
  clear: both;

  @media ${Device.laptopL} {
    max-width: 70%;
  }
`;
