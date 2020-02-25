import React, { useContext } from 'react';

import { ChatsContext } from '../contexts';
import { ChatTeaser } from './';

export function ChatsList() {
  const { isLoading, chats } = useContext(ChatsContext);

  if (isLoading) {
    return 'chats loading';
  }

  return (
    <div>
      {chats.map(chat => (
        <ChatTeaser chat={chat} key={chat.id} />
      ))}
    </div>
  );
}
