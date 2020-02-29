import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal, CreateChatForm, Search, ChatsList, ProposalsList } from './';
import { Colors } from '../styles';
import plus from '../assets/icons/plus.svg';
import chevronDown from '../assets/icons/sidebar/chevron-down.svg';

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  return (
    <Main>
      <Header>
        <Left>
          <h1>Chats</h1>
          <span>Recent Chats</span>
        </Left>
        <ButtonWrapper>
          <Button onClick={handleModalOpen}>Create New Chat</Button>
        </ButtonWrapper>
      </Header>
      <Search />
      <ChatsList />
      <Header>
        <Left>
          <h1>Proposals</h1>
          <span>All proposals</span>
        </Left>
      </Header>
      <ProposalsList />
      <Modal setIsOpen={setIsModalOpen} isOpen={isModalOpen}>
        <CreateChatForm />
      </Modal>
    </Main>
  );
}

const Main = styled.main`
  margin-top: 101px;
  width: 580px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 29px;

  h1 {
    font-size: 36px;
    font-weight: 500;
    color: ${Colors.BLACK};
    margin-bottom: 10px;
  }

  span {
    font-size: 18px;
    font-weight: 500;
    color: ${Colors.GRAY};
    position: relative;

    &::after {
      content: url(${chevronDown});
      position: absolute;
      right: -26px;
      top: 4px;
    }
  }
`;

const Left = styled.div``;

export const ButtonWrapper = styled.div`
  padding-top: 10px;
  position: relative;

  &::before {
    content: url(${plus});
    position: absolute;
    left: 26px;
    top: 29px;
  }
`;

export const Button = styled.button`
  width: 240px;
  height: 60px;
  color: ${Colors.WHITE};
  text-align: center;
  padding-left: 38px;
  font-size: 20px;
  font-weight: 500;
  font-family: 'TTMedium';
  border-radius: 6px;
  border: unset;
  background: linear-gradient(
    121deg,
    rgba(124, 184, 247, 1) 0%,
    rgba(42, 139, 242, 1) 100%
  );
  cursor: pointer;
`;
