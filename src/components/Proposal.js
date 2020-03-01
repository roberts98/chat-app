import React, { useState } from 'react';
import styled from 'styled-components';

import { acceptProposal, declineProposal } from '../firebase';
import { useUser } from '../hooks';
import { Icon } from './';
import { Colors } from '../styles/colors';
import checkmark from '../assets/icons/checkmark.svg';
import power from '../assets/icons/sidebar/power.svg';

export function Proposal({ proposal: { receipentId, requestorId, isMine } }) {
  const [isLoading, setIsLoading] = useState(false);
  const receipent = useUser(isMine ? receipentId : requestorId);
  const { photoURL, displayName } = receipent;

  async function handleAcceptClick() {
    setIsLoading(true);
    await acceptProposal(requestorId);
    setIsLoading(false);
  }

  async function handleDeclineClick() {
    setIsLoading(true);
    await declineProposal(requestorId);
    setIsLoading(false);
  }

  if (isLoading) {
    return 'loading';
  }

  return (
    <Wrapper>
      <Flex>
        <Flex>
          <Image src={photoURL} alt="avatar" />
          <Name>{displayName}</Name>
        </Flex>
        {!isMine && (
          <Flex>
            <Icon onClick={handleAcceptClick} icon={checkmark} />
            <Icon onClick={handleDeclineClick} icon={power} />
          </Flex>
        )}
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 580px;
  background-color: ${Colors.WHITE};
  padding: 28px 40px;
  border-radius: 6px;
  margin-bottom: 20px;
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
