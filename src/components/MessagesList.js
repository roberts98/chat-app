import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { firestore } from '../firebase';
import { Colors } from '../styles';

export function MessagesList({ userId, chatId }) {
  const [messages, setMessages] = useState([]);

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

  return (
    <Wrapper>
      {messages.map(message => {
        return (
          <Message isMine={message.senderId === userId} key={message.id}>
            {message.value}
          </Message>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 30px 60px;
  max-height: 50vh;
  overflow-y: auto;
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
  max-width: 70%;
  border: ${({ isMine }) => (isMine ? `1px solid ${Colors.LIGHT}` : 'none')};
  float: ${({ isMine }) => (isMine ? 'right' : 'left')};
  clear: both;
`;
