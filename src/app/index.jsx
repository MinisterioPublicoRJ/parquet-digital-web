import React, { createContext, useContext, useState } from 'react';

import './styles.css';
import Router from './router';
import Api from '../api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

function AuthContextCreator() {
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState(false);

  const tokenLogin = async token => {
    try {
      const loggedUser = await Api.login(token);
      setUser(loggedUser);
    } catch (e) {
      setUserError(true);
    }
  };

  const scaLogin = () => {
    // not yet implemented
  };

  return {
    user,
    userError,
    tokenLogin,
    scaLogin,
  };
}

function App() {
  const authValue = AuthContextCreator();
  return (
    <AuthContext.Provider value={authValue}>
      <Router />
    </AuthContext.Provider>
  );
}

// class App extends React.Component {
// constructor(props) {
//   super(props);
//   this.state = {
//     user: undefined,
//   };
// }

// componentDidMount() {
//   this.login();
// }
//
// async login() {
//   let loginError = false;
//   let user;
//   try {
//     const token = window.localStorage.getItem('access_token');
//     await Api.login(token);
//     user = getUser();
//   } catch (e) {
//     loginError = true;
//   } finally {
//     this.setState({ user, loginError });
//   }
// }

// pageSelector() {
//   const { user, loginError } = this.state;
//   const { tipo_orgao, nome } = user;
//   let page = <BlankPage />;
//
//   if (!loginError) {
//     switch (tipo_orgao) {
//       case 1:
//         page = <Tutela userName={nome} user={user} />;
//         break;
//       case 2:
//         page = <Pip userName={nome} user={user} />;
//         break;
//       default:
//         // if we don't have a dashboard yet, just show blank screen
//         break;
//     }
//   }
//
//   return page;
// }

export default App;
