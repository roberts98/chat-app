import React, { useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from '../contexts';
import { Proposal } from './Proposal';
import { useProposalsSubscriber } from '../hooks';

export function ProposalsList() {
  const { user } = useContext(UserContext);
  const proposals = useProposalsSubscriber(user.id);

  return (
    <Wrapper>
      {proposals.map(proposal => (
        <Proposal key={proposal.id} proposal={proposal} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-height: 50vh;
  overflow-y: auto;
  overflow-x: hidden;
`;
