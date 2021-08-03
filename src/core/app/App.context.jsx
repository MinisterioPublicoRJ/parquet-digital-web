import React, { createContext, useContext, useState } from 'react';
import Api from '../api/Api';

const AppContext = createContext();

export const AppProvider = ({ store, children }) => (
  <AppContext.Provider value={store}>{children}</AppContext.Provider>
);

export const useAppContext = () => useContext(AppContext);

export function AppStoreInitializer() {
  const [user, setUser] = useState(true);
  const [autoLoginFailed, setAutoLoginFailed] = useState(false);
  const [appHasCrashed, setAppHasCrashed] = useState(false);

  const loginWithToken = (jwtToken, storedUser) => {
    if (jwtToken) {
      loginWithJtwToken(jwtToken);
    } else if (storedUser) {
      //check if user is valid
      loginWithStoredUser(storedUser);
    } else {
      // no token was available
      setAutoLoginFailed(true);
    }
  };

  const loginWithJtwToken = () => {};

  const loginWithStoredUser = () => {};

  const loginWithSCACredentials = () => {};

  return {
    Api,
    autoLoginFailed,
    appHasCrashed,
    setAppHasCrashed,

    loginWithToken,
    loginWithSCACredentials,
  };
}
