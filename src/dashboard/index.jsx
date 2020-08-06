import React, { useState, useEffect } from 'react';

import { useAuth } from '../app/authContext';
import { Pip, Tutela, BlankPage } from './pages';
import { Glossary } from './sections';
import { Modal, Spinner } from '../components';
import OfficeSelector from './sections/Today/officeSelector';

function Dashboard() {
  const { currentOffice } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  function renderPage() {
    const { tipo } = currentOffice;
    switch (tipo) {
      case 1:
        return <Tutela setIsSelectorOpen={setIsSelectorOpen} />;
      case 2:
        return <Pip setIsSelectorOpen={setIsSelectorOpen} />;
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
      <OfficeSelector
        isOpen={isSelectorOpen}
        onToggle={() => setIsSelectorOpen(prevState => !prevState)}
      />
      {renderPage()}
    </>
  );
}

export default Dashboard;
