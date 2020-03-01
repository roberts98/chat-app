import React, { useState, useContext, useEffect } from 'react';

import { sendMessage } from '../firebase/dashboard';
import { UserContext } from '../contexts/UserContext';
import { MessagesList } from './';
import { firestore } from '../firebase';
import styled from 'styled-components';
import { Colors, Device } from '../styles';
import attach from '../assets/icons/attach.svg';
import moreVertical from '../assets/icons/more-vertical.svg';
import sendIcon from '../assets/icons/send.svg';
import { Redirect } from 'react-router-dom';

export function Chat({ match }) {
  const { user } = useContext(UserContext);
  const [chat, setChat] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [message, setMessage] = useState('');
  const { id } = match.params;

  useEffect(() => {
    async function getChat() {
      const snapshot = await firestore.doc(`/chats/${id}`).get();
      const chat = snapshot.data();
      setChat(chat);
    }

    getChat();
  }, [id]);

  useEffect(() => {
    async function getReceiver() {
      if (!chat) {
        return;
      }

      const receiverId = chat.members.filter(id => id !== user.id);
      if (receiverId.length) {
        const userSnapshot = await firestore.doc(`/users/${receiverId}`).get();
        setReceiver({ id: userSnapshot.id, ...userSnapshot.data() });
      }
    }

    getReceiver();
  }, [user.id, chat]);

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(id, { value: message, senderId: user.id });
    setMessage('');
  }

  if (!receiver) {
    return null;
  }

  if (!chat.members.includes(user.id)) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <Header>
        <Flex>
          <Image src={receiver.photoURL} alt={receiver.displayName} />
          <Name>{receiver.displayName}</Name>
        </Flex>
        <Flex>
          <Icon icon={attach} />
          <Icon icon={moreVertical} />
        </Flex>
      </Header>
      <MessagesList userId={user.id} chatId={id} />
      <Form onSubmit={handleSubmit}>
        <Input
          onChange={handleChange}
          value={message}
          placeholder="Type a message here"
        />
        <ButtonWrapper>
          <Button type="submit" />
        </ButtonWrapper>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 20px;
  height: 100%;
  background-color: ${Colors.WHITE};

  @media ${Device.laptop} {
    margin-top: 111px;
    margin-left: 40px;
    margin-right: 40px;
  }

  @media ${Device.laptopL} {
    margin-left: 88px;
    width: 600px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 20px;
  background-color: ${Colors.SUPER_LIGHT};
  height: 111px;
  border-bottom: 1px solid ${Colors.LIGHT};

  @media ${Device.laptop} {
    padding: 28px 60px;
  }
`;

const Image = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 50%;
`;

const Name = styled.h3`
  margin-left: 20px;
  color: ${Colors.BLACK};
`;

export const Icon = styled.span`
  display: block;
  width: 40px;
  height: 40px;
  box-shadow: 1px 3px 22px #ddd;
  border-radius: 50px;
  margin-left: 20px;
  cursor: pointer;
  position: relative;

  &::before {
    content: url(${({ icon }) => icon});
    position: absolute;
    left: 50%;
    top: 9px;
    transform: translateX(-50%);
    width: 24px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media ${Device.laptopL} {
    width: 52px;
    height: 52px;

    &::before {
      top: 15px;
    }
  }
`;

const Form = styled.form`
  clear: both;
  position: relative;
  padding: 30px 20px;

  @media ${Device.laptopL} {
    padding: 30px 60px;
  }
`;

const Input = styled.input`
  width: 100%;
  border: unset;
  border-top: 1px solid ${Colors.LIGHT};
  font-family: 'TTMedium';
  font-size: 20px;
  height: 60px;
  padding: 0 20px;

  &,
  &::placeholder {
    color: rgba(112, 124, 151, 0.5);
  }
`;

const ButtonWrapper = styled.div`
  &::before {
    content: url(${sendIcon});
    position: absolute;
    top: 39px;
    right: 20px;

    @media ${Device.laptopL} {
      right: 73px;
    }
  }
`;

const Button = styled.button`
  position: absolute;
  border: unset;
  width: 40px;
  height: 40px;
  background: unset;
  top: 39px;
  cursor: pointer;
  right: 20px;

  @media ${Device.laptopL} {
    right: 73px;
  }
`;
