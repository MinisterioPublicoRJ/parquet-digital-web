import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ store, children }) => (
  <AppContext.Provider value={store}>{children}</AppContext.Provider>
);

export const useAppContext = () => useContext(AppContext);

export function AppStoreInitializer() {
  const [isLoading, setIsLoading] = useState(true);

  const loginWithToken = (jwtToken, storedUser) => {
    if (jwtToken) {
      loginWithJtwToken(jwtToken);
    }
    else if (storedUser) { //check if user is valid
      loginWithStoredUser(storedUser)
    }
  }

  const loginWithJtwToken = () => {};

  const loginWithStoredUser = () => {};

  // const autoLogin = (jwt, storedUser) => {
  //   if (jwt) {
  //     tokenLogin(jwt);
  //   } else if (storedUser && isStoredUserValid(storedUser)) {
  //     const { userObj } = JSON.parse(storedUser);
  //     setUser(userObj);
  //   } else {
  //     if (storedUser) {
  //       setUserExpired(true);
  //       window.localStorage.removeItem('sca_token');
  //     }
  //     setUserError(true);
  //   }
  // };

  return { tokenLogin, isLoading };
}
