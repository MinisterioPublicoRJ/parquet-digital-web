import React, { useState } from 'react';

import { useAuth } from '../app/authContext';
import { Modal } from '../components';
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

function Dashboard() {
  const { user } = useAuth();
  const { tipoOrgao } = user;
  const [isModalOpen, setIsModalOpen] = useState(true);

  function renderPage() {
    switch (tipoOrgao) {
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
