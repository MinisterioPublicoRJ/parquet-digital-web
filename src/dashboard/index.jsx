import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { getUser } from '../user';
import AuthContext from '../app/authContext';
import { Spinner } from '../components/layoutPieces';
import Pip from '../dashboard/pages/pip';
import Tutela from '../dashboard/pages/tutela';
import BlankPage from '../dashboard/pages/blankPage';

import './styles.css';

function Dashboard () {
  const [contextUser, setcontextUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  function pageSelector  ()  {
    //const { user, userError } = authStore;
    //const loading = !(user || userError);
    let page = <BlankPage />;

    if (!loginError) {
      switch (tipo_orgao) {
        case 1:
          page = <Tutela userName={nome} user={user} />;
          break;
        case 2:
          page = <Pip userName={nome} user={user} />;
          break;
        default:
          // if we don't have a dashboard yet, just show blank screen
          break;
      }
    }

    return page;
  }

    if (loading) {
      return <Spinner size="large" />;
    }

    return (
      <HashRouter>
        <Switch>
          <Route exact path="/">
            {/*{this.pageSelector()}*/}
          </Route>
        </Switch>
      </HashRouter>
    );
}

export default Dashboard;