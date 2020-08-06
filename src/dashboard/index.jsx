import React, { useState } from 'react';

import { useAuth } from '../app/authContext';
import { Pip, Tutela, BlankPage } from './pages';
import { Glossary } from './sections';
import { Modal, Spinner } from '../components';
import OfficeSelector from './sections/Today/officeSelector';

function Dashboard() {
  const { currentOffice } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectorOpen, setSelectorOpen] = useState(true);

  if (!currentOffice) {
    return <div>loading</div>;
  }

  function renderPage() {
    const { tipo } = currentOffice;
    switch (tipo) {
      case 1:
        return <Tutela setSelectorOpen={setSelectorOpen} />;
      case 2:
        return <Pip setSelectorOpen={setSelectorOpen} />;
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
        onToggle={() => setSelectorOpen(prevState => !prevState)}
      />
      {renderPage()}
    </>
  );
}

export default Dashboard;
