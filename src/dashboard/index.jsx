import React from 'react';

import { useAuth } from '../app/authContext';
// import { Spinner } from '../components/layoutPieces';
import { Pip, Tutela, BlankPage } from './pages';

import './styles.css';

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

  // const [loading, setLoading] = useState(true);

  // function pageSelector() {
  //   // const { user, userError } = authStore;
  //   // const loading = !(user || userError);
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

  // if (loading) {
  //   return <Spinner size="large" />;
  // }
}

export default Dashboard;
