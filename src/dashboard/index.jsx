import React, { useState } from 'react';

import { useAuth } from '../app/authContext';
import { Pip, Tutela, BlankPage } from './pages';
import {
  IntroductionResume,
  IntroductionYourDesk,
  IntroductionPerfomanceRadar,
  IntroductionMainInvestigated,
  IntroductionAlerts,
  IntroductionSuccessIndicators,
  IntroductionProcessingTime,
  IntroductionProcessList,
  Glossary,
  SuccessIndicators,
} from './sections';

import { Modal } from '../components';

function Dashboard() {
  const { currentOffice } = useAuth();
  const { user } = useAuth();
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
      {user.firstLogin ? 
      <Modal isOpen={isModalOpen} onToggle={() => setIsModalOpen(oldState => !oldState)}>
        {/* <IntroductionResume onToggle={() => setIsModalOpen(oldState => !oldState)}  /> */}
        {/* <IntroductionYourDesk onToggle={() => setIsModalOpen(oldState => !oldState)}  /> */}
        {/* <IntroductionPerfomanceRadar onToggle={() => setIsModalOpen(oldState => !oldState)}  /> */}
        {/*<IntroductionAlerts onToggle={() => setIsModalOpen(oldState => !oldState)} />*/}
        {/*<IntroductionProcessingTime onToggle={() => setIsModalOpen(oldState => !oldState)} />*/}
        {/*<IntroductionProcessList onToggle={() => setIsModalOpen(oldState => !oldState)}  />*/}
        <IntroductionSuccessIndicators onToggle={() => setIsModalOpen(oldState => !oldState)} />
        <SuccessIndicators />
        {/*<IntroductionMainInvestigated onToggle={() => setIsModalOpen(oldState => !oldState)} />*/}
        {/*<Glossary onToggle={() => setIsModalOpen(oldState => !oldState)} />*/}
      </Modal>
      :
      renderPage()
      }
    </div>
  );
}

export default Dashboard;
