import React, { useState }  from 'react';

import { useAuth } from '../app/authContext';
//import { Spinner } from '../components/layoutPieces';
import { Pip, Tutela, BlankPage } from './pages';


function Dashboard() {
  //const [loading, setLoading] = useState(true);

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


  // if (loading) {
  //return <Spinner size="large" />;
  //}
}

export default Dashboard;
