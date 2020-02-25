import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { firestore } from '../firebase';
import { Colors } from '../styles/colors';
import avatar from '../assets/user.jpeg';

export function ChatTeaser({ chat }) {
  const [lastMessage, setLastMessage] = useState([]);
  const [users, setUsers] = useState([]);
  console.log(chat);

  useEffect(() => {
    async function getLastMessage() {
      const lastMessageDoc = await firestore
        .doc(`/chats/${chat.id}/messages/${chat.lastMessageId}`)
        .get();
      const lastMessage = lastMessageDoc.data();

      setLastMessage(lastMessage);
    }

    getLastMessage();
  }, [chat]);

  return (
    <Wrapper>
      <Flex>
        <Flex>
          <Image src={avatar} alt="avatar" />
          <Name>Luy Robin</Name>
        </Flex>
        <Date>1 minute ago</Date>
      </Flex>
      <Message>{lastMessage.message}</Message>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 580px;
  background-color: ${Colors.WHITE};
  padding: 40px;
  border-radius: 6px;
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
