import React, { createContext, useState, useEffect } from 'react';

import { auth } from '../firebase';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      setUser(user);
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
