import { useState, useEffect } from 'react';

import { proposalsSubscriber } from '../firebase';

export function useProposalsSubscriber(userId) {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const unsubscribe = proposalsSubscriber(userId, setProposals);

    return () => {
      unsubscribe();
    };
  }, [userId]);

  return proposals;
}
