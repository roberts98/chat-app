import React, { useContext } from 'react';

import { signInWithGoogle } from '../firebase';
import { UserContext } from '../contexts';

export function Login() {
  const user = useContext(UserContext);
  console.log(user);

  async function handleClick() {
    await signInWithGoogle();
  }

  return <button onClick={handleClick}>Login</button>;
}
