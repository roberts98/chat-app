import React from 'react';

import { signInWithGoogle } from '../firebase/auth';

export function Login() {
  function handleClick() {
    signInWithGoogle();
  }

  return <button onClick={handleClick}>Login</button>;
}
