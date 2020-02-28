import React, { useEffect, useState } from 'react';

import { firestore } from '../firebase';

export function MessagesList({ chatId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .doc(`chatMessages/${chatId}`)
      .onSnapshot(snapshot => {
        const data = snapshot.data();
        const messages = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
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
        <div key={message.id}>{message.value}</div>
      ))}
    </div>
  );
}
