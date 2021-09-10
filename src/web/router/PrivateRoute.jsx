import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component, path, isLogged }) {
  if (isLogged) {
    return <Route path={path} component={component} />;
  }
  return <Redirect to="/login" />;
}

export default ProtectedRoute;
