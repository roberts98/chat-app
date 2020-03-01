import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import { firestore } from '../firebase';
import { Colors, Device } from '../styles';

export function MessagesList({ userId, chatId }) {
  const [messages, setMessages] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const unsubscribe = firestore
      .doc(`chatMessages/${chatId}`)
      .onSnapshot(snapshot => {
        const data = snapshot.data();

        if (!data) {
          return setMessages([]);
        }

        const messages = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        const sortedMessages = messages.sort(
          (a, b) => a.date.seconds - b.date.seconds
        );

        setMessages(sortedMessages);
      });

    return () => {
      unsubscribe();
    };
  }, [chatId]);

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
