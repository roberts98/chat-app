import React, { useState, useEffect } from 'react';

import { getMessages, sendMessage } from '../firebase/dashboard';
import { MessagesList } from './';

export function Chat({ match }) {
  const [chat, setChat] = useState({});
  const [message, setMessage] = useState('');
  const { id } = match.params;

  useEffect(() => {
    async function setChatState() {
      const snapshot = await getMessages(id);
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setChat(messages);
    }

    setChatState();
  }, [id]);

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
