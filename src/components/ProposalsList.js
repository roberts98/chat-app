import React, { useState, useContext, useEffect } from 'react';

import { UserContext } from '../contexts';
import { firestore } from '../firebase';
import { Proposal } from './Proposal';

export function ProposalsList() {
  const { user } = useContext(UserContext);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection(`users/${user.id}/chatProposals`)
      .onSnapshot(snapshot => {
        const proposals = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProposals(proposals);
      });

    return () => {
      unsubscribe();
    };
  }, [user.id]);

  return proposals.map(proposal => (
    <Proposal key={proposal.id} proposal={proposal} />
  ));
}
