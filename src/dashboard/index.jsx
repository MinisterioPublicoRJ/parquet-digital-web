import React, { useState } from 'react';

import { useAuth } from '../app/authContext';
import { Pip, Tutela, BlankPage } from './pages';
import { Glossary } from './sections';
import { Modal } from '../components';

function Dashboard() {
  const { currentOffice } = useAuth();
  const { tipo } = currentOffice;
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Modal isOpen={isModalOpen} onToggle={() => setIsModalOpen(oldState => !oldState)}>
        <Glossary onToggle={() => setIsModalOpen(oldState => !oldState)} />
      </Modal>
      {renderPage()}
    </div>
  );
}

export default Dashboard;
