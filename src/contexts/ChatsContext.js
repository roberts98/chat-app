import React, { createContext, useState, useEffect, useContext } from 'react';

import { UserContext } from './UserContext';
import { userChatSubscriber } from '../firebase';

export const ChatsContext = createContext();

export function ChatsProvider({ children }) {
  const { user } = useContext(UserContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = userChatSubscriber(user.id, setChats);

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <ChatsContext.Provider value={{ chats }}>{children}</ChatsContext.Provider>
  );
}
