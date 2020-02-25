import React, { createContext, useState, useEffect } from 'react';
import { firestore } from '../firebase';

export const ChatsContext = createContext();

export function ChatsProvider({ children }) {
  const [chats, setChats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubrcibe = firestore.collection('chats').onSnapshot(snapshot => {
      const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setChats(chats);
    });

    return () => {
      unsubrcibe();
    };
  }, []);

  return (
    <ChatsContext.Provider value={{ chats, isLoading }}>
      {children}
    </ChatsContext.Provider>
  );
}
