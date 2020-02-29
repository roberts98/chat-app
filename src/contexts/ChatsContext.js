import React, { createContext, useState, useEffect, useContext } from 'react';

import { firestore } from '../firebase';
import { UserContext } from './UserContext';

export const ChatsContext = createContext();

export function ChatsProvider({ children }) {
  const { user } = useContext(UserContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    (async function() {
      if (user) {
        const snapshot = await firestore.doc(`userChats/${user.id}`).get();
        if (!snapshot.data()) {
          return setChats([]);
        }

        const { chats } = snapshot.data();
        setChats(chats);
      }
    })();
  }, [user]);

  return (
    <ChatsContext.Provider value={{ chats }}>{children}</ChatsContext.Provider>
  );
}
