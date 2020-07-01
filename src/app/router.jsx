import React from 'react';
import PropTypes from 'prop-types';

import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import Auth from '../auth';
import Login from '../login';
import Dashboard from '../dashboard';

const propTypes = {
  user: PropTypes.shape({}),
};
const defaultProps = {
  user: undefined,
};

function Router({ user }) {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard">{user ? <Dashboard /> : <Redirect to="/" />}</Route>
      </Switch>
    </HashRouter>
  );
}
Router.propTypes = propTypes;
Router.defaultProps = defaultProps;
export default Router;
