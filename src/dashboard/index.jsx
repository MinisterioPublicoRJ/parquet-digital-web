import React, { useState } from 'react';

import { useAuth } from '../app/authContext';
import { Pip, Tutela, AlternativeWelcome } from './pages';
import { Glossary, Introduction, MapaTron } from './sections';
import { Modal, Spinner, InvestigatedProfile, ProcessDetail } from '../components';

import OfficeSelector from './sections/Today/officeSelector';
import RadarModal from './sections/PerformanceRadar/RadarModal';

function Dashboard() {
  const { user, currentOffice } = useAuth();
  const { firstLogin } = useAuth().user;

  // this states should be a part of a context hoook to make things neater
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState(null);

  // maybe this two could be refactored to use the same modal context
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(firstLogin);

  if (!user) {
    return <Spinner size="large" />;
  }
  const type = currentOffice ? currentOffice.tipo : undefined;

  function closeModal() {
    setModalType(null);
    setModalData(null);
  }

  function setInvestigatedProfile(representanteDk) {
    if (representanteDk) setModalType('investigated');
    setModalData(representanteDk);
    return representanteDk;
  }

  function setProcessDetail(docuNrMp, docuNrExterno) {
    if (docuNrMp) setModalType('process');
    setModalData([docuNrMp, docuNrExterno]);
    return docuNrMp;
  }

  function renderModalChildren() {
    switch (modalType) {
      case 'glossary':
        return <Glossary onToggle={closeModal} />;
      case 'investigated':
        return (
          <InvestigatedProfile representanteDk={modalData} onToggle={closeModal} organType={type} />
        );
      case 'radar':
        return <RadarModal compareData={modalData} onToggle={closeModal} />;
      case 'mapatron':
        return <MapaTron mapatronData={modalData} onToggle={closeModal} />;
      case 'process':
        return (
          <ProcessDetail
            docuNrMp={modalData[0]}
            docuNrExterno={modalData[1]}
            onToggle={closeModal}
          />
        );
      default:
        return null;
    }
  }

  function renderPage() {
    switch (type) {
      case 1:
        return (
          <Tutela
            setIsSelectorOpen={setIsSelectorOpen}
            setIsIntroOpen={setIsIntroOpen}
            setModalType={setModalType}
            setModalData={setModalData}
            setInvestigatedProfile={setInvestigatedProfile}
            setProcessDetail={setProcessDetail}
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
            setProcessDetail={setProcessDetail}
          />
        );
      default:
        return <AlternativeWelcome />;
    }
  }

  return (
    <>
      <Introduction
        isOpen={isIntroOpen}
        onToggle={() => setIsIntroOpen((oldState) => !oldState)}
        type={type}
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
