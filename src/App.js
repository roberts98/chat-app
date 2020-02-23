import React from 'react';

import { UserProvider } from './contexts';
import { Router } from './routes';

function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export default App;
