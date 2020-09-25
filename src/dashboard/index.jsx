import React, { useState } from 'react';

import { useAuth } from '../app/authContext';
import { Pip, Tutela, BlankPage } from './pages';
import { Glossary, Introduction } from './sections';
import { Modal, Spinner } from '../components';

import OfficeSelector from './sections/Today/officeSelector';
import RadarModal from './sections/PerformanceRadar/RadarModal';
import InvestigatedProfile from './sections/MainInvestigated/InvestigatedProfile';

function Dashboard() {
  const { currentOffice } = useAuth();
  const { firstLogin } = useAuth().user;

  // this states should be a part of a context hoook to make things neater
  const [modalData, setModalData] = useState(null);
  const [modalType, setModalType] = useState('');

  // maybe this two could be refactored to use the same modal context
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(firstLogin);

  if (!currentOffice) {
    return <Spinner size="large" />;
  }
  const { tipo } = currentOffice;

  function setInvestigatedProfile(representanteDk) {
    setModalType('investigated');
    setModalData(representanteDk);
    return representanteDk;
  }

  function renderModalChildren() {
    const toggleFunction = () => setModalType(null);
    switch (modalType) {
      case 'glossary':
        return <Glossary onToggle={toggleFunction} />;
      case 'investigated':
        return <InvestigatedProfile representanteDk={modalData} onToggle={toggleFunction} />;
      case 'radar':
        return <RadarModal representanteDk={modalData} onToggle={toggleFunction} />;
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
          />
        );
      case 2:
        return (
          <Pip
            setIsSelectorOpen={setIsSelectorOpen}
            setModalType={setModalType}
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
      {modalType && <Modal onToggle={() => setModalType(null)}>{renderModalChildren()}</Modal>}
      <OfficeSelector
        isOpen={isSelectorOpen}
        onToggle={() => setIsSelectorOpen((prevState) => !prevState)}
      />
      {renderPage()}
    </>
  );
}

export default Dashboard;
