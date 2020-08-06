import React, { useState } from 'react';

import { useAuth } from '../app/authContext';
import { Pip, Tutela, BlankPage } from './pages';
import { Glossary } from './sections';
import { Modal, Spinner } from '../components';

function Dashboard() {
  const { currentOffice } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function renderPage() {
    const { tipo } = currentOffice;
    switch (tipo) {
      case 1:
        return <Tutela />;
      case 2:
        return <Pip />;
      default:
        return <BlankPage />;
    }
  }

  if (!currentOffice) {
    return <Spinner size="large" />;
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onToggle={() => setIsModalOpen(oldState => !oldState)}>
        <Glossary onToggle={() => setIsModalOpen(oldState => !oldState)} />
      </Modal>
      {renderPage()}
    </>
  );
}

export default Dashboard;
