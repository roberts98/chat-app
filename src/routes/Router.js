import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Home, Login } from '../components';

export function Router({ children }) {
  return (
    <BrowserRouter>
      {children}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
