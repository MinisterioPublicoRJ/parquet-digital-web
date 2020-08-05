import React, { useState } from 'react';
import { useAuth } from '../app/authContext';
import { Pip, Tutela, BlankPage } from './pages';
import { Introduction, Glossary } from './sections';

import { Modal } from '../components';

function Dashboard() {
  const { currentOffice } = useAuth();
  const { user } = useAuth();
  const { tipo } = currentOffice;
  const { tipoOrgao } = user;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(true);

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

  return (
      <div>
        <Introduction
          isOpen={isIntroOpen}
          onToggle={() => setIsIntroOpen(oldState => !oldState)}
          type={tipoOrgao}
        />
        {user.firstLogin ? 
        <Modal isOpen={isModalOpen} onToggle={() => setIsModalOpen(oldState => !oldState)}>
          <Glossary onToggle={() => setIsModalOpen(oldState => !oldState)} />
        </Modal>
        :
        renderPage()
        }
    </div>
  );
}

export default Dashboard;
