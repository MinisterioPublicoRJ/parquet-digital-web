import React, { useState } from 'react';

import { useAuth } from '../app/authContext';
// import { Modal } from '../components';
import { Pip, Tutela, BlankPage } from './pages';

function Dashboard() {
  const { user } = useAuth();
  const { tipoOrgao } = user;
  // const [isModalOpen, setIsModalOpen] = useState(false);
  console.log('user', user);
  function renderPage() {
    switch (tipoOrgao) {
      case 1:
        return <Tutela />;
      case 2:
        return <Pip />;
      default:
        return <BlankPage />;
    }
  }

  return (
    <div>
      {/* <Modal isOpen={isModalOpen} onToggle={() => setIsModalOpen(oldState => !oldState)}>
        <div>Teste</div
      </Modal> */}
      {renderPage()}
    </div>
  );
}

export default Dashboard;
