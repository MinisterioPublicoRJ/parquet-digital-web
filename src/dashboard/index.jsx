import React from 'react';

import { useAuth } from '../app/authContext';
import { Pip, Tutela, BlankPage } from './pages';

function Dashboard() {
  const { currentOffice } = useAuth();
  const { tipo } = currentOffice;
  function renderPage() {
    switch (tipo) {
      case 1:
        return <Tutela />;
      case 2:
        return <Pip />;
      default:
        return <BlankPage />;
    }
  }

  return <div>{renderPage()}</div>;
}

export default Dashboard;
