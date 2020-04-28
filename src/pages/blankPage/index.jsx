import React from 'react';

import { withRouter } from 'react-router';

import Api from '../../api';
import { getUser } from '../../user';

class BlankPage extends React.Component {
  componentDidMount() {
    this.login();
  }

  async login() {
    let loginError = false;
    let user;
    try {
      const token = window.localStorage.getItem('access_token');
      await Api.login(token);
      user = getUser().nome;
    } catch (e) {
      loginError = true;
    } finally {
      // navigating to the right page
      const { history, onFetchedUser } = this.props;
      const userObj = getUser();
      const path = this.handlePageSelection(userObj);
      onFetchedUser(user);
      history.push(path);
    }
  }

  handlePageSelection(user) {
    const { tipo_orgao } = user;

    switch (tipo_orgao) {
      case 0:
        return '/tutela';
      case 2:
        return '/pip';
      default:
        return '/';
    }
  }

  render() {
    return <div />
  }
}

export default withRouter(BlankPage);
