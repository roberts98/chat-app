import { useState, useEffect } from 'react';

import { messagesSubscriber } from '../firebase';

export function useMessagesSubscriber(chatId) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = messagesSubscriber(chatId, setMessages);

    return () => {
      unsubscribe();
    };
  }, [chatId]);

  return messages;
}
