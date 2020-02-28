import React, { useState, useContext } from 'react';

import { sendMessage } from '../firebase/dashboard';
import { UserContext } from '../contexts/UserContext';
import { MessagesList } from './';

export function Chat({ match }) {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const { id } = match.params;

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(id, { value: message, senderId: user.id });
  }

  return (
    <form onSubmit={handleSubmit}>
      <MessagesList chatId={id} />
      <textarea onChange={handleChange} value={message} placeholder="message" />
      <button type="submit">Send</button>
    </form>
  );
}
