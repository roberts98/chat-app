import React, { useContext } from 'react';

import { UserContext } from '../contexts';
import { Proposal } from './Proposal';
import { useProposalsSubscriber } from '../hooks/useProposalsSubscriber';

export function ProposalsList() {
  const { user } = useContext(UserContext);
  const proposals = useProposalsSubscriber(user.id);

  return proposals.map(proposal => (
    <Proposal key={proposal.id} proposal={proposal} />
  ));
}
