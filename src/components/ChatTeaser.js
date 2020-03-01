import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

import { UserContext } from '../contexts';
import { useUser, useLastMessage, useChatSubscriber } from '../hooks';
import { Device, Colors } from '../styles';

export function ChatTeaser({ id }) {
  const {
    user: { id: userId }
  } = useContext(UserContext);
  const [{ lastMessageId, receipentId }] = useChatSubscriber(id, userId);
  const receipent = useUser(receipentId);
  const lastMessage = useLastMessage(id, lastMessageId);

  const { value, date } = lastMessage;
  const { photoURL, displayName } = receipent;

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
  background-color: ${Colors.WHITE};
  padding: 28px 40px;
  border-radius: 6px;
  margin-bottom: 20px;

  a {
    text-decoration: none;
  }

  @media ${Device.laptopL} {
    width: 580px;
  }
`;

const Flex = styled.div`
  @media ${Device.laptop} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
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
