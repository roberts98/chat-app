import React, { createContext, useState, useEffect } from 'react';
import { firestore } from '../firebase';

export const ChatsContext = createContext();

export function ChatsProvider({ children }) {
  const [chats, setChats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function setChatsState() {
      setIsLoading(true);
      const snapshot = await firestore.collection('chats').get();
      const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setIsLoading(false);
      setChats(chats);
    }

    setChatsState();
  }, []);

  return (
    <ChatsContext.Provider value={{ chats, isLoading }}>
      {children}
    </ChatsContext.Provider>
  );
}
