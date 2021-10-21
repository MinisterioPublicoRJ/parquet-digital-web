import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component, path, isLogged }) {
  console.log('trying protected route, path: ', path, '\n\n\n\n\n\nislogged: ', isLogged, '\n\n\n\n\n\n');
  if (isLogged) {
    return <Route path={path} component={component} />;
  }
  return <Redirect to="/login" />;
}

export default ProtectedRoute;
