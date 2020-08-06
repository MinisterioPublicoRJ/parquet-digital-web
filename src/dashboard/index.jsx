import React, { useState, useEffect } from 'react';

import { useAuth } from '../app/authContext';
import { Pip, Tutela, BlankPage } from './pages';
import { Glossary } from './sections';
import { Modal, Spinner } from '../components';
import OfficeSelector from './sections/Today/officeSelector';

function Dashboard() {
  const { currentOffice } = useAuth();
  console.log('Dashboard', currentOffice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  function renderPage() {
    console.log('renderPage');
    const { tipo } = currentOffice;
    switch (tipo) {
      case 1:
      console.log('1');
        return <Tutela setIsSelectorOpen={setIsSelectorOpen} />;
      case 2:
      console.log('2');
        return <Pip setIsSelectorOpen={setIsSelectorOpen} />;
      default:
      console.log('3');
        return <BlankPage />;
    }
  }

  if (!currentOffice) {
    console.log('!currentOffice');
    return <Spinner size="large" />;
  }
  console.log('everything went well');
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
