import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Colors } from '../styles/colors';
import { firestore } from '../firebase';
import { acceptProposal, declineProposal } from '../firebase/dashboard';
import { Icon } from './';
import checkmark from '../assets/icons/checkmark.svg';
import power from '../assets/icons/sidebar/power.svg';

export function Proposal({ proposal: { receipentId, requestorId, isMine } }) {
  const [receipent, setReceipent] = useState({});
  const { photoURL, displayName } = receipent;

  useEffect(() => {
    async function getUser() {
      const userDoc = await firestore
        .doc(`users/${isMine ? receipentId : requestorId}`)
        .get();
      const userData = userDoc.data();
      setReceipent(userData);
    }

    getUser();
  }, [receipentId, requestorId, isMine]);

  function handleAcceptClick() {
    acceptProposal(requestorId);
  }

  function handleDeclineClick() {
    declineProposal(requestorId);
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
