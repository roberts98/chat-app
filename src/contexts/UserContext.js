import React, { createContext, useState, useEffect } from 'react';

import { auth } from '../firebase';
import { createUserDocument } from '../firebase/auth';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const userDocument = await createUserDocument(user);
        setUser({ id: userDocument.id, ...userDocument.data() });
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
