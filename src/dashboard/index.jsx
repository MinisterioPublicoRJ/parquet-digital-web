import React, { useState } from 'react';

import { useAuth } from '../app/authContext';
import { Modal } from '../components';
import { Pip, Tutela, BlankPage } from './pages';
import { Introduction, Glossary } from './sections';

function Dashboard() {
  const { user } = useAuth();
  const { tipoOrgao } = user;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(true);

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
      <Introduction
        isOpen={isIntroOpen}
        onToggle={() => setIsIntroOpen(oldState => !oldState)}
        type={tipoOrgao}
      />
      <Modal isOpen={isModalOpen} onToggle={() => setIsModalOpen(oldState => !oldState)}>
        <Glossary onToggle={() => setIsModalOpen(oldState => !oldState)} />
      </Modal>
      {renderPage()}
    </div>
  );
}

export default Dashboard;
