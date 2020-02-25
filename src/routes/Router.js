import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Home, Chat } from '../components';

export function Router({ children }) {
  return (
    <BrowserRouter>
      {children}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/chats/:id" component={Chat} />
      </Switch>
    </BrowserRouter>
  );
}
