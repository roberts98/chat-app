import React, { useEffect, useState } from 'react';

import { firestore } from '../firebase';

export function MessagesList({ chatId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection(`chats/${chatId}/messages`)
      .onSnapshot(snapshot => {
        const messages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setMessages(messages);
      });

    return () => {
      unsubscribe();
    };
  }, [chatId]);

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>{message.message}</div>
      ))}
    </div>
  );
}
