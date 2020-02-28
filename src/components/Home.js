import React, { useState } from 'react';

import { Modal, CreateChatForm, ChatsList } from './';

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  return (
    <div>
      <button onClick={handleModalOpen}>Create chat</button>
      <ChatsList />
      <Modal setIsOpen={setIsModalOpen} isOpen={isModalOpen}>
        <CreateChatForm />
      </Modal>
    </div>
  );
}
