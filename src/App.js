import React, { useContext } from 'react';

import { UserContext } from './contexts';
import { Router } from './routes';
import { Login, FullPageSpinner } from './components';

function App() {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (!user) {
    return <Login />;
  }

  return <Router />;
}

export default App;
