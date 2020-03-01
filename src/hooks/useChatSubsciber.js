import { useState, useEffect } from 'react';

import { chatSubscriber } from '../firebase';

export function useChatSubscriber(chatId, userId) {
  const [lastMessageId, setLastMessageId] = useState(null);
  const [receipentId, setReceipentId] = useState(null);

  function chatSubscriberCallback(messageId, userId) {
    setLastMessageId(messageId);
    setReceipentId(userId);
  }

  useEffect(() => {
    const unsubsribeFromChats = chatSubscriber(
      chatId,
      userId,
      chatSubscriberCallback
    );

    return () => {
      unsubsribeFromChats();
    };
  }, [userId, chatId]);

  return [{ lastMessageId, receipentId }];
}
