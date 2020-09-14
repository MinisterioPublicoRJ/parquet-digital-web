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
  const [investigatedProfileData, setInvestigatedProfileData] = useState(null);

  const [currentModalChildren, setCurrentModalChildren] = useState(null);

  useEffect(() => {
    let children = null;
    if (investigatedProfileData != null) {
      children = (
        <InvestigatedProfile
          data={investigatedProfileData}
          onToggle={() => setIsModalOpen((oldState) => !oldState)}
        />
      );
    } else {
      children = <Glossary onToggle={() => setIsModalOpen((oldState) => !oldState)} />;
    }

    setCurrentModalChildren(children);
  }, [investigatedProfileData]);

  if (!currentOffice) {
    return <Spinner size="large" />;
  }
  const { tipo } = currentOffice;

  function setInvestigatedProfile(isOpen, data) {
    console.log('data set inv prof: ', data);
    setInvestigatedProfileData(data);
    console.log('modalchildren:', currentModalChildren);
    return data;
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
      <Modal isOpen={isModalOpen} onToggle={() => setIsModalOpen((oldState) => !oldState)}>
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
