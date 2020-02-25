import React from 'react';
import { Link } from 'react-router-dom';

export function ChatTeaser({ chat }) {
  return <Link to={`/chats/${chat.id}`}>{chat.id}</Link>;
}
