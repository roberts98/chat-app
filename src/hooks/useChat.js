import { useState, useEffect } from 'react';

import { getChatData } from '../firebase';

export function useChat(id) {
  const [chat, setChat] = useState({});

  useEffect(() => {
    async function getChat() {
      const chat = await getChatData(id);
      setChat(chat);
    }

    getChat();
  }, [id]);

  return chat;
}
