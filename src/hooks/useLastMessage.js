import { useState, useEffect } from 'react';

import { getChatMessagesData } from '../firebase';

export function useLastMessage(chatId, lastMessageId) {
  const [lastMessage, setLastMessage] = useState('');

  useEffect(() => {
    async function getLastMessage() {
      const data = await getChatMessagesData(chatId);

      if (data && lastMessageId) {
        const lastMessage = data[lastMessageId];

        setLastMessage({
          value: lastMessage.value,
          date: lastMessage.date
        });
      }
    }

    getLastMessage();
  }, [lastMessageId, chatId]);

  return lastMessage;
}
