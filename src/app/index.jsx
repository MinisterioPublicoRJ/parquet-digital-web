import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Pip from '../pages/pip';
import Tutela from '../pages/tutela';
import BlankPage from '../pages/blankPage';

import './styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  handleUserData(user, history, path) {
    console.log('user', user, history);
    this.setState({ user });
    // history.push(path);
  }

  render() {
    const { user } = this.state;

    return (
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <BlankPage onFetchedUser={user => this.handleUserData(user)} />
          </Route>
          <Route path="/pip">
            <Pip user={user} />
          </Route>
          <Route path="/tutela">
            <Tutela user={user} />
          </Route>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
