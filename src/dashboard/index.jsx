import React from 'react';

import { useAuth } from '../app/authContext';
import { Pip, Tutela, BlankPage } from './pages';

function Dashboard() {
  const { user } = useAuth();
  const { tipoOrgao } = user;

  switch (tipoOrgao) {
    case 1:
      return <Tutela />;
    case 2:
      return <Pip />;
    default:
      return <BlankPage />;
  }
}

export default Dashboard;
