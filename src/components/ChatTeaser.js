import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

import { firestore } from '../firebase';
import { Colors } from '../styles/colors';

export function ChatTeaser({ id }) {
  const [lastMessage, setLastMessage] = useState('');
  const [lastMessageId, setLastMessageId] = useState(null);

  useEffect(() => {
    const unsubsribeFromLastMessage = firestore
      .doc(`/chats/${id}`)
      .onSnapshot(snapshot => {
        const { lastMessageId } = snapshot.data();
        setLastMessageId(lastMessageId);
      });

    return () => {
      unsubsribeFromLastMessage();
    };
  }, [id]);

  useEffect(() => {
    async function getLastMessage() {
      const chatMessageDoc = await firestore.doc(`/chatMessages/${id}`).get();
      const data = chatMessageDoc.data();

      if (data && lastMessageId) {
        const lastMessage = data[lastMessageId];

        const userSnapshot = await firestore
          .doc(`/users/${lastMessage.senderId}`)
          .get();
        const userData = userSnapshot.data();

        setLastMessage({
          value: lastMessage.value,
          date: lastMessage.date,
          ...userData
        });
      }
    }

    getLastMessage();
  }, [lastMessageId, id]);

  const { value, photoURL, date, displayName } = lastMessage;

  return (
    <Wrapper>
      <Link to={`/chats/${id}`}>
        <Flex>
          <Flex>
            <Image src={photoURL} alt="avatar" />
            <Name>{displayName}</Name>
          </Flex>
          <Date>{date && moment(date.toDate()).fromNow()}</Date>
        </Flex>
        <Message>{lastMessage && value}</Message>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 580px;
  background-color: ${Colors.WHITE};
  padding: 28px 40px;
  border-radius: 6px;
  margin-bottom: 20px;

  a {
    text-decoration: none;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 54px;
  height: 54px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
`;

const Name = styled.h3`
  color: ${Colors.DARK};
  font-size: 18px;
`;

const Date = styled.span`
  color: ${Colors.GRAY};
`;

const Message = styled.p`
  margin-top: 15px;
  color: ${Colors.GRAY};
  line-height: 26px;
`;
