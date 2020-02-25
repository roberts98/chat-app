import React, { useState } from 'react';

import { sendMessage } from '../firebase/dashboard';
import { MessagesList } from './';

export function Chat({ match }) {
  const [message, setMessage] = useState('');
  const { id } = match.params;

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(id, message);
  }

  return (
    <form onSubmit={handleSubmit}>
      <MessagesList chatId={id} />
      <textarea onChange={handleChange} value={message} placeholder="message" />
      <button type="submit">Send</button>
    </form>
  );
}
