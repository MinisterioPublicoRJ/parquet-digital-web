import React from 'react';
import { isAuthenticated } from '../../src/auth';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import Pip from './pages/pip';
import Tutela from './pages/tutela';
import Login from './components/login';

const PrivateRoute = ({ component: Component, ...rest }) => {
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
    )} />
}
const Routes = () => (
    <Router>
      <Switch>
        <PrivateRoute exact path="/login" component={Login} />
        <Tutela />
        <Pip />
      </Switch>
    </Router>
  );
  
  export default Routes;