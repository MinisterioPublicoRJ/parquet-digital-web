import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ store, children }) => (
  <LoginContext.Provider value={store}>{children}</LoginContext.Provider>
);

export const useLoginContext = () => useContext(LoginContext);

export function LoginStoreInitializer() {
  const [loginHasCrashed, setLoginHasCrashed] = useState(false);
  const [isLoading, setLoadingState] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return {
    loginHasCrashed,
    setLoginHasCrashed,
    isLoading,
    setLoadingState,
    username,
    setUsername,
    password,
    setPassword,
  };
}
