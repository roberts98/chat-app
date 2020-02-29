import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Home, Chat, Sidebar } from '../components';

export function Router() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Home />
      <Switch>
        <Route path="/chats/:id" component={Chat} />
      </Switch>
    </BrowserRouter>
  );
}
