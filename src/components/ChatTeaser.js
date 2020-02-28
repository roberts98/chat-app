import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { firestore } from '../firebase';
import { Colors } from '../styles/colors';
import avatar from '../assets/user.jpeg';

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
        setLastMessage(data[lastMessageId]);
      }
    }

    getLastMessage();
  }, [lastMessageId, id]);

  return (
    <Wrapper>
      <Link to={`chats/${id}`}>
        <Flex>
          <Flex>
            <Image src={avatar} alt="avatar" />
            <Name>Luy Robin</Name>
          </Flex>
          <Date>1 minute ago</Date>
        </Flex>
        <Message>{lastMessage && lastMessage.value}</Message>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 580px;
  background-color: ${Colors.WHITE};
  padding: 40px;
  border-radius: 6px;

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
