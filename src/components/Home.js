import React, { useState } from 'react';

import { signOut } from '../firebase/auth';
import { Modal, CreateChatForm, ChatsList } from './';

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function handleLogout() {
    signOut();
  }

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleModalOpen}>Create chat</button>
      <button onClick={handleLogout}>Log out</button>
      <ChatsList />
      <Modal setIsOpen={setIsModalOpen} isOpen={isModalOpen}>
        <CreateChatForm />
      </Modal>
    </div>
  );
}
