import React, { createContext, useState, useEffect, useContext } from 'react';

import { firestore } from '../firebase';
import { UserContext } from './UserContext';

export const ChatsContext = createContext();

export function ChatsProvider({ children }) {
  const { user } = useContext(UserContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore
        .doc(`userChats/${user.id}`)
        .onSnapshot(snapshot => {
          if (!snapshot.data()) {
            return setChats([]);
          }

          const { chats } = snapshot.data();
          setChats(chats);
        });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <ChatsContext.Provider value={{ chats }}>{children}</ChatsContext.Provider>
  );
}
