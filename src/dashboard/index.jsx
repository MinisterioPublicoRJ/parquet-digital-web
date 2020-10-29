import React, { useState } from 'react';

import { useAuth } from '../app/authContext';
import { Pip, Tutela, BlankPage } from './pages';
import { Glossary, Introduction, MapaTron } from './sections';
import { Modal, Spinner, InvestigatedProfile } from '../components';

import OfficeSelector from './sections/Today/officeSelector';
import RadarModal from './sections/PerformanceRadar/RadarModal';

function Dashboard() {
  const { currentOffice } = useAuth();
  const { firstLogin } = useAuth().user;

  // this states should be a part of a context hoook to make things neater
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState(null);

  // maybe this two could be refactored to use the same modal context
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(firstLogin);

  if (!currentOffice) {
    return <Spinner size="large" />;
  }
  const { tipo } = currentOffice;

  function closeModal() {
    setModalType(null);
    setModalData(null);
  }

  function setInvestigatedProfile(representanteDk) {
    if (representanteDk) setModalType('investigated');
    setModalData(representanteDk);
    return representanteDk;
  }

  function renderModalChildren() {
    switch (modalType) {
      case 'glossary':
        return <Glossary onToggle={closeModal} />;
      case 'investigated':
        return (
          <InvestigatedProfile representanteDk={modalData} onToggle={closeModal} organType={tipo} />
        );
      case 'radar':
        return <RadarModal compareData={modalData} onToggle={closeModal} />;
      case 'mapatron':
        return <MapaTron mapatronData={modalData} onToggle={closeModal} />;
      default:
        return null;
    }
  }

  function renderPage() {
    switch (tipo) {
      case 1:
        return (
          <Tutela
            setIsSelectorOpen={setIsSelectorOpen}
            setIsIntroOpen={setIsIntroOpen}
            setModalType={setModalType}
            setModalData={setModalData}
            setInvestigatedProfile={setInvestigatedProfile}
          />
        );
      case 2:
        return (
          <Pip
            setIsSelectorOpen={setIsSelectorOpen}
            setModalType={setModalType}
            setModalData={setModalData}
            setIsIntroOpen={setIsIntroOpen}
            setInvestigatedProfile={setInvestigatedProfile}
          />
        );
      default:
        return <BlankPage />;
    }
  }

  return (
    <>
      <Introduction
        isOpen={isIntroOpen}
        onToggle={() => setIsIntroOpen((oldState) => !oldState)}
        type={tipo}
      />
      {modalType && <Modal onToggle={() => closeModal()}>{renderModalChildren()}</Modal>}
      <OfficeSelector
        isOpen={isSelectorOpen}
        onToggle={() => setIsSelectorOpen((prevState) => !prevState)}
      />
      {renderPage()}
    </>
  );
}

export default Dashboard;
