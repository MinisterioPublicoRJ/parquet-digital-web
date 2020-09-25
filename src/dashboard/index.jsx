import React, { useState, useEffect } from 'react';

import { useAuth } from '../app/authContext';
import { Pip, Tutela, BlankPage } from './pages';
import { Glossary, Introduction } from './sections';
import { Modal, Spinner } from '../components';
import OfficeSelector from './sections/Today/officeSelector';
import InvestigatedProfile from './sections/MainInvestigated/InvestigatedProfile';

function Dashboard() {
  const { currentOffice } = useAuth();
  const { firstLogin } = useAuth().user;
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(firstLogin ? true : false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [representanteDk, setRepresentanteDk] = useState(null);

  const [currentModalChildren, setCurrentModalChildren] = useState(null);

  const onToggleModal = () => {
    setRepresentanteDk(null);
    setIsModalOpen((oldState) => !oldState);
  };

  useEffect(() => {
    let children = null;
    if (representanteDk != null) {
      children = <InvestigatedProfile representanteDk={representanteDk} onToggle={onToggleModal} />;
    } else {
      children = <Glossary onToggle={() => setIsModalOpen((oldState) => !oldState)} />;
    }

    setCurrentModalChildren(children);
  }, [representanteDk]);

  if (!currentOffice) {
    return <Spinner size="large" />;
  }
  const { tipo } = currentOffice;

  function setInvestigatedProfile(representanteDk) {
    setIsModalOpen(true);
    setRepresentanteDk(representanteDk);
    return representanteDk;
  }

  function renderPage() {
    switch (tipo) {
      case 1:
        return (
          <Tutela
            setIsSelectorOpen={setIsSelectorOpen}
            setIsModalOpen={setIsModalOpen}
            setIsIntroOpen={setIsIntroOpen}
          />
        );
      case 2:
        return (
          <Pip
            setIsSelectorOpen={setIsSelectorOpen}
            setIsModalOpen={setIsModalOpen}
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
      <Modal isOpen={isModalOpen} onToggle={onToggleModal}>
        {currentModalChildren}
      </Modal>
      <OfficeSelector
        isOpen={isSelectorOpen}
        onToggle={() => setIsSelectorOpen((prevState) => !prevState)}
      />
      {renderPage()}
    </>
  );
}

export default Dashboard;
