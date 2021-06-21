import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ store, children }) => (
  <AppContext.Provider value={store}>{children}</AppContext.Provider>
);

export const useAppContext = () => useContext(AppContext);

export function AppStoreInitializer() {
  // const [hasFatalError, setHasFatalError] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  return {};
}
