import React, { useState, useEffect, useContext } from 'react';

import {
  getAllUsersExceptLoggedInUser,
  createChat
} from '../firebase/dashboard';
import { UserContext } from '../contexts/UserContext';

export function CreateChatForm() {
  const { user } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);
  const [formState, setFormState] = useState({
    name: '',
    members: []
  });

  useEffect(() => {
    async function setUsersState() {
      const users = await getAllUsersExceptLoggedInUser(user);
      setAllUsers(users);
    }

    setUsersState();
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createChat(formState.name, '3lGtCiMCUnOQj7c2mQ2WepQvae73');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formState.name}
        onChange={handleChange}
        type="text"
        placeholder="Chat name"
      />
      <input
        name="members"
        value={formState.members}
        onChange={handleChange}
        type="text"
        placeholder="Chat members"
      />
      <button type="submit">Create</button>
    </form>
  );
}
