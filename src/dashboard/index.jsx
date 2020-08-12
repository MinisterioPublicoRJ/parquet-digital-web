import React, { useState } from 'react';

import { useAuth } from '../app/authContext';
import { Pip, Tutela, BlankPage } from './pages';
import { Glossary, Introduction } from './sections';
import { Modal, Spinner } from '../components';
import OfficeSelector from './sections/Today/officeSelector';

function Dashboard() {
  const { currentOffice } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(true);

  if (!currentOffice) {
    return <Spinner size="large" />;
  }
  const { tipo } = currentOffice;

  function renderPage() {
    switch (tipo) {
      case 1:
        return <Tutela setIsSelectorOpen={setIsSelectorOpen} setIsModalOpen={setIsModalOpen} />;
      case 2:
        return <Pip setIsSelectorOpen={setIsSelectorOpen} setIsModalOpen={setIsModalOpen} />;
      default:
        return <BlankPage />;
    }
  }

  return (
    <>
      <Introduction
        isOpen={isIntroOpen}
        onToggle={() => setIsIntroOpen(oldState => !oldState)}
        type={tipo}
      />
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
