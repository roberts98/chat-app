import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';

import { getAvailableUsers, createChatProposal } from '../firebase';
import { UserContext } from '../contexts/UserContext';
import { Button, ButtonWrapper } from './';

export function CreateChatForm() {
  const { user } = useContext(UserContext);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [receipent, setReceipent] = useState('');

  useEffect(() => {
    async function setUsersState() {
      const users = await getAvailableUsers(user.id);
      setAvailableUsers(users);
    }

    setUsersState();
  }, [user]);

  function handleChange(option) {
    setReceipent(option);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createChatProposal(user.id, receipent.id);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Select
        onChange={handleChange}
        options={availableUsers}
        getOptionLabel={option => option.displayName}
        getOptionValue={option => option.id}
        placeholder="Select receipent"
      />
      <ButtonWrapper>
        <Button type="submit">Create New Chat</Button>
      </ButtonWrapper>
    </form>
  );
}
