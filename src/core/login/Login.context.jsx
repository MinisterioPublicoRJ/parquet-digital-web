import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ store, children }) => (
  <LoginContext.Provider value={store}>{children}</LoginContext.Provider>
);

export const useLoginContext = () => useContext(LoginContext);

export function LoginStoreInitializer() {
  const [username, setUsername] = useState('');
  const [secret, setSecret] = useState('');
  const [isLoading, setLoadingState] = useState(false);

  useEffect(() => {
    if (scaUserError) {
      setLoadingState(false);
    }
  }, [scaUserError]);

  return {
  };
}
