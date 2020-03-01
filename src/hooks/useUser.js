import { useState, useEffect } from 'react';

import { getUserData } from '../firebase';

export function useUser(userId) {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      if (userId) {
        const userData = await getUserData(userId);
        setUser(userData);
      }
    }

    getUser();
  }, [userId]);

  return user;
}
