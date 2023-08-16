import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export function LoginProvider({ store, children }) {
  return <LoginContext.Provider value={store}>{children}</LoginContext.Provider>
}

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
