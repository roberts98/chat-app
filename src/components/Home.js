import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../contexts';
import { signOut } from '../firebase';

export function Home() {
  const { user, isLoading } = useContext(UserContext);

  function handleLogout() {
    signOut();
  }

  if (isLoading) {
    return 'loading';
  }

  return (
    <div>
      <h1>Home</h1>
      {user ? (
        <button onClick={handleLogout}>Log out</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}
